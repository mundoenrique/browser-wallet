import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import axios, { AxiosRequestHeaders } from 'axios';
//Internal app
import logger from './logger';
import { handleApiRequest } from './apiHandle';
import { APIGEE_HEADERS_NAME, SESSION_ID } from './constants';
import { createRedisInstance, delRedis, getRedis } from './redis';
import { encryptForge, setDataRedis, validateTime } from './toolHelper';
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

  apiGee.defaults.headers.common = {
    Authorization: `Bearer ${oauth}`,
    'X-Tenant-Id': tenantId,
    'X-Token': `JWS ${jws}`,
    'X-Request-Id': headers.get('X-Request-Id'),
    identifier: 'e30b625a-e085-42a5-aac2-3d52f73ad8fe',
  };
}

export async function getOauthBearer() {
  const redis = createRedisInstance();
  let bearer = (await redis.get('bearer')) as string;

  if (!bearer) {
    const grant_type = 'client_credentials';
    const client_id = process.env.CREDENTIALS_KEY;
    const client_secret = process.env.CREDENTIALS_SECRET;

    delete apiGee.defaults.headers.common['Authorization'];
    delete apiGee.defaults.headers.common['X-Tenant-Id'];
    delete apiGee.defaults.headers.common['X-Token'];
    delete apiGee.defaults.headers.common['X-Request-Id'];

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
    await redis.set('bearer', bearer);
    await redis.expire('bearer', 1740);
    await redis.quit();
  }

  return bearer;
}

export async function HandleCustomerRequest(request: NextRequest) {
  let { method, headers } = request;

  const validate = await validateSession(request);

  if (validate) {
    await refreshTime(request);
  } else {
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
      responseBack = sessionExpired();
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
    const timeRest: number = resRedis.timeSession ? validateTime(185, resRedis.timeSession) : 0;

    const time = timeRest <= 0 ? false : true;
    timeRest <= 0 ? await delRedis(`session:${uuid}`) : '';
    return time;
  } else {
    return false;
  }
}

function sessionExpired() {
  logger.debug('El tiempo de session en redis ha finalizado');

  const response = {
    status: 401,
    data: {
      code: '401.00.1000',
      datetime: new Date(),
      message: 'Session redis expired',
    },
  };

  return response;
}

async function refreshTime(request: NextRequest) {
  const uuidCookie = cookies().get(SESSION_ID)?.value || encryptForge(request.headers.get('X-Session-Mobile'));
  if (uuidCookie) {
    const date = new Date();
    const stateObject = { timeSession: date.toString() };
    await setDataRedis('PUT', { uuid: `session:${uuidCookie}`, data: stateObject });
  }
}
