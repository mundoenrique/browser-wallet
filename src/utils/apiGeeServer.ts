import axios, { AxiosRequestHeaders, InternalAxiosRequestConfig } from 'axios';
import { getEnvVariable } from './apiHelpers';
import uuid4 from 'uuid4';
import { APIGEE_HEADERS_NAME } from './constants';

const baseURL = getEnvVariable('APIGEE_HOST');

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

export function configureDefaultHeaders(headers: Headers) {
  const tenantId = getEnvVariable('TENANT_ID');
  apiGee.defaults.headers.common = {
    ...filterHeaders(headers),
    'X-Tenant-Id': tenantId,
  };
}

export async function getToken() {
  const grant_type: string = 'client_credentials';
  const client_id: string | undefined = process.env.BACK_APP_CREDENTIALS_KEY;
  const client_secret: string | undefined = process.env.BACK_APP_CREDENTIALS_SECRET;
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
