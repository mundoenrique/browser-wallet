import axios, { InternalAxiosRequestConfig } from 'axios';
import { getEnvVariable } from './apiHelpers';

const baseURL = getEnvVariable('APIGEE_HOST');

export const apiGee = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
  },
  validateStatus: function (status) {
    return status >= 200 && status < 500;
  },
});

apiGee.interceptors.request.use(
  (request) => {
    const url = request.url;
    const data = request.data;
    const headers = {
      Authorization: request.headers['Authorization'],
      'X-Tenant-Id': request.headers['X-Tenant-Id'],
      'X-Token': request.headers['X-Token'],
    };

    console.log('apiGeeServer Request: ');
    console.log({ url, data, headers });
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export function configureDefaultHeaders(headers: Headers) {
  const authorization = headers.get('Authorization');
  const tenantId = headers.get('X-Tenant-Id');
  const jws = headers.get('X-Token');

  apiGee.defaults.headers.common = {
    Authorization: authorization,
    'X-Tenant-Id': tenantId,
    'X-Token': jws,
  };
}

export async function getToken() {
  const grant_type: string = 'client_credentials';
  const client_id: string | undefined = process.env.APIGEE_APP_CREDENTIALS_KEY;
  const client_secret: string | undefined = process.env.APIGEE_APP_CREDENTIALS_SECRET;
  const response = await apiGee.post(`/oauth2/v1/token`, { grant_type, client_id, client_secret });
  console.log('response.data', response.data);

  const { data } = response;
  return data;
}

export async function connect(method: string, url: string, headers: Headers, data: any = undefined) {
  configureDefaultHeaders(headers);

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
    default:
      throw new Error(`Invalid method: ${method}`);
  }
  return response;
}
