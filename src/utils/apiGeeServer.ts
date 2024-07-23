import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import axios, { AxiosRequestHeaders } from 'axios';
//Internal app
import logger from './logger';
import { handleApiRequest } from './apiHandle';
import { encryptForge, validateTime } from './toolHelper';
import { APIGEE_HEADERS_NAME, SESSION_ID } from './constants';
import { createRedisInstance, delDataRedis, delRedis, getRedis, putRedis } from './redis';
import { getEnvVariable, handleApiGeeRequest, handleApiGeeResponse } from './apiHelpers';

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
    const {
      status,
      data,
      config: { url },
    } = response;

    if (url === 'oauth2/v1/token' && data) {
      logger.debug('Response services %s', JSON.stringify({ status, data }));
    }

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
  let { method, headers } = request;

  const device = await validateDevice(request);
  const validate:any = (device) ? await validateSession(request) : {status: false, code: '401.00.9999'};

  if (!validate.status) {
    method = 'SESSION';
  }

  let jwsString: string = '';
  let jweString: string = '';
  const url = headers.get('x-url') as string;
  headers.delete('x-url');

  const { data, jweAppPublicKey } = await handleApiRequest(request);

  if (data) {
    const { jwe, jws } = await handleApiGeeRequest(data);
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
      responseBack = sessionExpired(validate);
      break;
    default:
      responseBack = { data: Error(`Invalid method: ${method}`) };
  }

  const encryptedResponse = await handleApiGeeResponse(responseBack.data, responseBack.status ?? 400, jweAppPublicKey);

  return encryptedResponse;
}

async function validateSession(request: NextRequest) {
  let uuid = request.cookies.get(SESSION_ID)?.value || encryptForge(request.headers.get('X-Session-Mobile'));
  const dataRedis = (await getRedis(`session:${uuid}`)) || null;

  if (dataRedis) {

    const resRedis = JSON.parse(dataRedis);
    const viewApi = validateApiRoute(request.headers.get('x-url') as string)

    if (!viewApi) return {status: true, code: '200.00.000'}

    const timeRest: number = (resRedis.timeSession && resRedis.login) ?
      validateTime(180, resRedis.timeSession) : 0;

    const time = timeRest <= 0 ? {status: false, code: '401.00.9998'} : {status: true, code: '200.00.000'};
    if (!time.status && request.headers.get('X-Session-Mobile')) await delRedis(`session:${uuid}`);
    time.status && await refreshTime(uuid);

    return time;
  } else {
    return {status: false, code: '401.00.9999'};
  }
}

function sessionExpired(validate: any) {

  logger.debug('El tiempo de session ha finalizado');

  const response: any = {
    status: 401,
    data: {
      code: validate.code,
      datetime: new Date(),
      message: 'Session expired',
    }
  }

  return response;
}

async function refreshTime(uuid: string) {

  const date = new Date();
  const stateObject = { timeSession: date.toString() };
  await putRedis(`session:${uuid}`, stateObject);
}

async function startSession(request: NextRequest, url: string, status: number) {

  if (url.includes('/users/credentials') && status === 200) {

    let uuid = request.cookies.get(SESSION_ID)?.value || encryptForge(request.headers.get('X-Session-Mobile'));
    const device = request.cookies.get(SESSION_ID)?.value ? true : false;
    const dataRedis = await getRedis(`session:${uuid}`) || '';

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
  const dataRedis = await getRedis(`activeSession`) || '';
  const resRedis = dataRedis ? JSON.parse(dataRedis) : {} ;

  !dataRedis && await redis.set('activeSession', '{}');

  if (resRedis.hasOwnProperty(userId)) {
    const activeSession = resRedis[userId];
    if (activeSession) {
      delDataRedis('activeSession', [userId])
      await delRedis(`session:${activeSession.uuid}`)
    }
  }

  const stateObject = {
    [userId]: {
      uuid
    }
  }

  await putRedis(`activeSession`, stateObject);
  await redis.expire('activeSession', 60 * 60 * 8);
  await redis.quit();
}

function validateApiRoute(url: string) {

  const uuidPattern = "[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}";
  const consultantCodePattern = "\\d{9}";
  const noSessionValidationRoutes = [
    "api/v0/catalogs/search",
    "api/v0/onboarding/validate",
    "api/v0/onboarding/blacklist",
    "api/v0/onboarding/documents/validate",
    "api/v0/onboarding/termsandconditions",
    "api/v0/onboarding/consultantdata",
    "api/v0/onboarding/pep",
    "api/v0/onboarding/credentials",
    "api/v0/onboarding/validatebiometric",
    "api/v0/onboarding/capturephotobiometrics",
    "api/v0/users/credentials",
    "api/v0/users/null",
    new RegExp(`^api/v0/users/${uuidPattern}/credentials$`),
    new RegExp(`^api/v0/users/${uuidPattern}/tfa$`),
    new RegExp(`^api/v0/users/${uuidPattern}$`),
    new RegExp(`^api/v0/users/${uuidPattern}/validate/tfa$`),
    new RegExp(`^api/v0/onboarding/validate\\?consultantCode=${consultantCodePattern}&countryCode=PE$`)
  ];

  const requiresValidation = !noSessionValidationRoutes.some(pattern =>
    typeof pattern === "string" ? pattern === url : pattern.test(url)
  );

  return requiresValidation
}

async function validateDevice(request: NextRequest) {

  let validate = true;

  if (request.headers.get('X-Device-Id')) {

    let uuid = request.cookies.get(SESSION_ID)?.value;
    const dataRedis = await getRedis(`session:${uuid}`) || '';

    if (dataRedis) {
      const resRedis = JSON.parse(dataRedis);
      validate = (resRedis.deviceId === request.headers.get('X-Device-Id')) ? true : false;
    } else {
      validate = false;
    }
  }

  return validate;
}
