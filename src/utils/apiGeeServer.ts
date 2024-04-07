import axios, { AxiosRequestHeaders, InternalAxiosRequestConfig } from 'axios';
import { getEnvVariable } from './apiHelpers';
import { APIGEE_HEADERS_NAME } from './constants';

const baseURL = getEnvVariable('BACK_URL');

export const apiGee = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  validateStatus: function (status) {
    return status >= 200 && status < 500;
  },
});

apiGee.interceptors.request.use(
  (request) => {
    const url = request.url;
    const body = request.data;
    const headers = filterHeaders(request.headers);

    console.log('--------------- apiGeeServer Request ---------------');
    console.log({ url, body, headers });

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiGee.interceptors.response.use(
  (response) => {
    const body = response.data;
    console.log('--------------- apiGeeServer Response ---------------');
    console.log({ body });
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

export async function configureDefaultHeaders(headers: Headers) {
  console.log('configureDefaultHeaders **************************', headers);
  const tenantId = getEnvVariable('TENANT_ID');
  const oauthToken = await getOauthBearer();
  apiGee.defaults.headers.common = {
    Authorization: `Bearer ${oauthToken}`,
    ...filterHeaders(headers),
    'X-Tenant-Id': tenantId,
  };
}

export async function getOauthBearer() {
  // const redis = createRedisInstance();
  // let bearer = await redis.get('bearer');
  let bearer: string;

  // if (!bearer) {
  const grant_type = 'client_credentials';
  const client_id = process.env.CREDENTIALS_KEY;
  const client_secret = process.env.CREDENTIALS_SECRET;

  const response = await apiGee.post(
    `/oauth2/v1/token`,
    { grant_type, client_id, client_secret },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );

  const { data } = response;
  bearer = data.access_token;
  // await redis.set('bearer', bearer);
  // await redis.expire('bearer', 1740);
  // }

  return bearer;
}

export async function connect(method: string, url: string, headers: Headers, data: any = undefined) {
  await configureDefaultHeaders(headers);

  let response;
  switch (method.toLowerCase()) {
    case 'get':
      response = await apiGee.get(url);
      break;
    case 'post':
      response = await apiGee.post(url, data);
      break;
    case 'put':
      response = await apiGee.put(url, data);
      break;
    case 'patch':
      response = await apiGee.patch(url, data);
      break;
    case 'delete':
      response = await apiGee.delete(url);
      break;
    default:
      throw new Error(`Invalid method: ${method}`);
  }

  return response;
}
