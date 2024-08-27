import forge from 'node-forge';
import { NextRequest } from 'next/server';
import axios, { AxiosRequestHeaders } from 'axios';
//Internal app
import logger from './logger';
import { decryptJWE } from '.';
import { handleApiRequest } from './apiHandle';
import { decryptForge, encryptForge, validateTime } from './toolHelper';
import { getEnvVariable, handleApiGeeRequest, handleApiGeeResponse } from './apiHelpers';
import { createRedisInstance, delDataRedis, delRedis, getRedis, putRedis } from './redis';
import {
  APIGEE_HEADERS_NAME,
  REDIS_CIPHER,
  SESSION_ID,
  TIME_SESSION_CLIENT,
  KEYS_TO_ENCRYPT_API,
  KEYS_TO_ENCRYPT_CLIENT,
  KEYS_DATA_VALIDATE,
} from '@/utils/constants';

const baseURL = getEnvVariable('BACK_URL');

const apiGee = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  validateStatus: function (status) {
    return status >= 200 && status <= 500;
  },
});

apiGee.interceptors.request.use(
  (request) => {
    const { method, baseURL, url, data } = request;
    const headers = filterHeaders(request.headers);
    const reqUrl = `${baseURL}/${url}`;
    let body = data;

    if (url !== 'oauth2/v1/token' && data) {
      body = data.dataReq;
      delete request.data.dataReq;
    }

    logger.debug('Request services %s', JSON.stringify({ method, reqUrl, headers, body }));

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiGee.interceptors.response.use(
  (response) => {
    const { status, data, config } = response;

    logger.debug('Response services %s', JSON.stringify({ url: config.url, status, data }));

    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export function filterHeaders(headers: Headers | AxiosRequestHeaders) {
  const filteredHeaders: { [key: string]: string } = {};

  APIGEE_HEADERS_NAME.forEach((name) => {
    let value: string | null | undefined;
    value = headers instanceof Headers ? headers.get(name) : headers[name];
    if (value !== undefined && value !== null) {
      filteredHeaders[name] = value;
    }
  });

  return filteredHeaders;
}

export async function configureDefaultHeaders(headers: Headers, oauth: string, jws: string) {
  const tenantId = getEnvVariable('TENANT_ID');
  const identifier = headers.get('identifier') ? headers.get('identifier') : headers.get('X-Session-Mobile');

  apiGee.defaults.headers.common = {
    Authorization: `Bearer ${oauth}`,
    'X-Tenant-Id': tenantId,
    'X-Token': `JWS ${jws}`,
    'X-Request-Id': headers.get('X-Request-Id'),
    identifier,
  };
}

export async function getOauthBearer() {
  const redis = createRedisInstance();
  let bearer = (await redis.get('bearer')) as string;

  if (!bearer) {
    const grant_type = 'client_credentials';
    const client_id = process.env.CREDENTIALS_KEY;
    const client_secret = process.env.CREDENTIALS_SECRET;

    delete apiGee.defaults.headers.common['X-Token'];
    delete apiGee.defaults.headers.common['X-Tenant-Id'];
    delete apiGee.defaults.headers.common['X-Request-Id'];
    delete apiGee.defaults.headers.common['Authorization'];

    const response = await apiGee.post(
      `oauth2/v1/token`,
      { grant_type, client_id, client_secret },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const { data } = response;
    bearer = data.access_token;

    logger.debug('Response Oauth %s', JSON.stringify({ bearer }));

    await redis.set('bearer', bearer);
    await redis.expire('bearer', 1740);
    await redis.quit();
  }

  return bearer;
}

export async function HandleCustomerRequest(request: NextRequest) {
  let { method, headers,  } = request;
  const url = headers.get('x-url') as string;

  const validate = await validateSession(request);

  if (!validate.status) {
    method = 'SESSION';
  }

  let jwsString: string = '';
  let jweString: string = '';
  headers.delete('x-url');

  const { data, jweAppPublicKey } = await handleApiRequest(request);

  if (data) {
    const dataEncrypt = await encrypToDecrypt(request, data, url, 'server');
    const { jwe, jws } = await handleApiGeeRequest(dataEncrypt);
    jweString = jwe;
    jwsString = jws;
  }

  const oauthToken = await getOauthBearer();
  await configureDefaultHeaders(headers, oauthToken, jwsString);

  let responseBack;
  switch (method.toLowerCase()) {
    case 'get':
      responseBack = await apiGee.get(url);
      break;
    case 'post':
      responseBack = await apiGee.post(url, { data: jweString, dataReq: data });
      await startSession(request, url, responseBack.status);
      break;
    case 'put':
      responseBack = await apiGee.put(url, { data: jweString, dataReq: data });
      break;
    case 'patch':
      responseBack = await apiGee.patch(url, { data: jweString, dataReq: data });
      break;
    case 'delete':
      responseBack = await apiGee.delete(url);
      break;
    case 'session':
      responseBack = await sessionExpired(validate);
      break;
    default:
      responseBack = { data: Error(`Invalid method: ${method}`) };
  }

  if (responseBack.data.data) {
    responseBack.data.data = await encrypToDecrypt(request, responseBack.data.data, url, 'client');
  }

  const encryptedResponse = await handleApiGeeResponse(responseBack.data, responseBack.status ?? 400, jweAppPublicKey);

  return encryptedResponse;
}

async function validateSession(request: NextRequest) {
  let uuid = request.cookies.get(SESSION_ID)?.value || request.headers.get('X-Session-Mobile') || '';
  const dataRedis = (await getRedis(`session:${uuid}`)) || null;

  if (dataRedis) {
    const resRedis = JSON.parse(dataRedis);

    const validateParams = await validateParam(resRedis, request.headers.get('x-url') as string, uuid);

    if (!validateParams) {
      await delRedis(`session:${uuid}`);
      return { status: false, code: '401.00.9997' };
    }

    const viewApi = validateApiRoute(request.headers.get('x-url') as string);

    if (!viewApi) return { status: true, code: '200.00.000' };

    const timeRest: number =
      resRedis.timeSession && resRedis.login ? validateTime(TIME_SESSION_CLIENT, resRedis.timeSession) : 0;

    const time = timeRest <= 0 ? { status: false, code: '401.00.9998' } : { status: true, code: '200.00.000' };
    if (!time.status && request.headers.get('X-Session-Mobile')) await delRedis(`session:${uuid}`);
    time.status && (await refreshTime(uuid));

    return time;
  } else {
    return { status: false, code: '401.00.9999' };
  }
}

async function sessionExpired(validate: any) {

  logger.debug('The session time is over');

  const response: any = {
    status: 401,
    data: {
      code: validate.code,
      datetime: new Date(),
      message: 'Session expired',
    },
  };

  return response;
}

async function refreshTime(uuid: string) {
  const date = new Date();
  const stateObject = { timeSession: date.toString() };
  await putRedis(`session:${uuid}`, stateObject);
}

async function startSession(request: NextRequest, url: string, status: number) {
  if (url.includes('/users/credentials') && status === 200) {
    let uuid = request.cookies.get(SESSION_ID)?.value || request.headers.get('X-Session-Mobile') || '';
    const device = request.cookies.get(SESSION_ID)?.value ? true : false;
    const dataRedis = (await getRedis(`session:${uuid}`)) || '';

    const stateObject = { login: true };
    await putRedis(`session:${uuid}`, stateObject);

    if (device) {
      const resRedis = JSON.parse(dataRedis);
      const userId = resRedis.register.state.user.userId;
      await duplicateSession(userId, uuid, device);
    }

    await refreshTime(uuid);
  }
}

async function duplicateSession(userId: string, uuid: string, device: boolean) {
  if (!device) return false;

  const redis = createRedisInstance();
  const dataRedis = (await getRedis(`activeSession`)) || '';
  const resRedis = dataRedis ? JSON.parse(dataRedis) : {};

  !dataRedis && (await redis.set('activeSession', '{}'));

  if (resRedis.hasOwnProperty(userId)) {
    const activeSession = resRedis[userId];
    if (activeSession) {
      delDataRedis('activeSession', [userId]);
      await delRedis(`session:${activeSession.uuid}`);
    }
  }

  const stateObject = {
    [userId]: {
      uuid,
    },
  };

  await putRedis(`activeSession`, stateObject);
  await redis.expire('activeSession', 60 * 60 * 8);
  await redis.quit();
}

function validateApiRoute(url: string) {
  const uuidPattern = '[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}';
  const consultantCodePattern = '\\d{9}';
  const noSessionValidationRoutes = [
    'api/v0/catalogs/search',
    'api/v0/onboarding/validate',
    'api/v0/onboarding/blacklist',
    'api/v0/onboarding/documents/validate',
    'api/v0/onboarding/termsandconditions',
    'api/v0/onboarding/consultantdata',
    'api/v0/onboarding/pep',
    'api/v0/onboarding/credentials',
    'api/v0/onboarding/validatebiometric',
    'api/v0/onboarding/capturephotobiometrics',
    'api/v0/users/credentials',
    'api/v0/users/null',
    new RegExp(`^api/v0/onboarding/${uuidPattern}/tfa$`),
    new RegExp(`^api/v0/onboarding/${uuidPattern}/validate/tfa$`),
    new RegExp(`^api/v0/users/${uuidPattern}/credentials$`),
    new RegExp(`^api/v0/users/${uuidPattern}/tfa$`),
    new RegExp(`^api/v0/users/${uuidPattern}$`),
    new RegExp(`^api/v0/users/${uuidPattern}/validate/tfa$`),
    new RegExp(`^api/v0/onboarding/validate\\?consultantCode=${consultantCodePattern}&countryCode=PE$`),
  ];

  const requiresValidation = !noSessionValidationRoutes.some((pattern) =>
    typeof pattern === 'string' ? pattern === url : pattern.test(url)
  );

  return requiresValidation;
}

async function encrypToDecrypt(request: NextRequest, data: any, url: string, type: string) {
  let uuid = request.cookies.get(SESSION_ID)?.value || request.headers.get('X-Session-Mobile') || '';
  const dataRedis = (await getRedis(`session:${uuid}`)) || '';
  const keysObjet = type === 'server' ? KEYS_TO_ENCRYPT_API : KEYS_TO_ENCRYPT_CLIENT;
  const noSessionValidationRoutes = ['api/v0/onboarding/termsandconditions'];
  let decryptedObject = data;

  if (type === 'client') {
    const jwePrivateKey = getEnvVariable('BACK_JWE_PRIVATE_KEY');
    const decryptData = await decryptJWE(data, jwePrivateKey);
    decryptedObject = decryptData;
  }

  if (dataRedis) {
    const resRedis = JSON.parse(dataRedis);
    const secret = forge.util.decode64(resRedis.exchange);
    const keyDecrypt = type === 'server' ? secret : REDIS_CIPHER;
    const keyEncrypt = type === 'server' ? REDIS_CIPHER : secret;

    const requiresValidation = !noSessionValidationRoutes.some((pattern: any) =>
      typeof pattern === 'string' ? pattern === url : pattern.test(url)
    );

    if (requiresValidation) encryptJSON(decryptedObject, keysObjet, keyDecrypt, keyEncrypt);
  }

  if (type === 'client') {
    await saveDataValidate(request, decryptedObject, url)
    const { jwe, } = await handleApiGeeRequest(decryptedObject);
    decryptedObject = jwe;
  }

  return decryptedObject;
}

async function saveDataValidate(request: NextRequest, data: any, url: string) {

  type DataObject = {
    [key: string]: any;
  };

  let result: DataObject = {};
  let uuid = request.cookies.get(SESSION_ID)?.value || request.headers.get('X-Session-Mobile') || '';
  const dataRedis = (await getRedis(`session:${uuid}`)) || '';

  const consultantCodePattern = '\\d{9}';
  const noSessionValidationRoutes = [
    new RegExp(`^api/v0/users/search\\?phoneNumber=${consultantCodePattern}$`),
  ];

  const requiresValidation = !noSessionValidationRoutes.some((pattern) =>
    typeof pattern === 'string' ? pattern === url : pattern.test(url)
  );

  if (!requiresValidation) return true;

  if (dataRedis) {
    KEYS_DATA_VALIDATE.forEach((key) => {
      if (key in data) {
        result[key] = data[key];
      } else {
        for (const prop in data) {
          if (typeof data[prop] === 'object' && data[prop] !== null) {
            if (key in data[prop]) {
              result[key] = data[prop][key];
            }
          }
        }
      }
    });
    if (Object.keys(result).length != 0) {
      await putRedis(`session:${uuid}`, result);
    }
  }

}

async function validateParam(resRedis: any, url: string, uuid: string) {

  const regex = /api\/v0\/(onboarding|users|payments|cards)\/([a-z0-9-]+)(?:\/.*)?/;
  const match = url.match(regex) || '';

  const uuidPattern = '[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}';
  const consultantCodePattern = '\\d{9}';
  const noSessionValidationRoutes = [
    'api/v0/users/credentials',
    new RegExp(`^api/v0/users/search\\?phoneNumber=${consultantCodePattern}$`),
    new RegExp(`^api/v0/users/${uuidPattern}/tfa$`),
  ];

  const requiresValidation = !noSessionValidationRoutes.some((pattern) =>
    typeof pattern === 'string' ? pattern === url : pattern.test(url)
  );

  if (!requiresValidation) return true;

  const resourceType = match[1];
  const paramFromUrl = match[2];

  switch (resourceType) {
    case 'users':
    case 'payments':
      if (paramFromUrl != resRedis.userId) await delRedis(`session:${uuid}`);
      return paramFromUrl === resRedis.userId
    case 'cards':
      const secret = forge.util.decode64(resRedis.exchange);
      const cardId = decryptForge(resRedis.cardId, secret);
      if (paramFromUrl != cardId) await delRedis(`session:${uuid}`);
      return paramFromUrl === cardId
    default:
      return true
  }
}

function encryptJSON(obj: any, keysObjet: any, keyDecrypt: string, keyEncrypt: string) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (keysObjet.includes(key) && typeof obj[key] === 'string') {
        if (!/^[0-9]+$/.test(obj[key])) {
          obj[key] = decryptForge(obj[key], keyDecrypt);
          obj[key] = encryptForge(obj[key], keyEncrypt);
        }
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        encryptJSON(obj[key], keysObjet, keyDecrypt, keyEncrypt);
      }
    }
  }
}

async function validateDevice(request: NextRequest) {
  let validate = true;

  if (request.headers.get('X-Device-Id')) {
    let uuid = request.cookies.get(SESSION_ID)?.value;
    const dataRedis = (await getRedis(`session:${uuid}`)) || '';

    if (dataRedis) {
      const resRedis = JSON.parse(dataRedis);
      validate = resRedis.deviceId === request.headers.get('X-Device-Id') ? true : false;
    } else {
      validate = false;
    }
  }

  return validate;
}
