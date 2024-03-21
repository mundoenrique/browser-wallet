import axios, { InternalAxiosRequestConfig } from 'axios';

export const apiGee = axios.create({
  baseURL: '/api/apiGee',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
  },
  validateStatus: function (status) {
    return status >= 200 && status < 500;
  },
});

export async function configureHeaders(request: InternalAxiosRequestConfig<any>, accessToken: string) {
  const url = request.url;
  if (url !== '/gettoken') {
    request.headers['X-Tenant-Id'] = process.env.TENANT_ID;
    if (!request.headers['Authorization']) {
      request.headers['Authorization'] = `Bearer ${accessToken}`;
    }
  }

  return request;
}
