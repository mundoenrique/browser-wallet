import axios, { InternalAxiosRequestConfig } from 'axios';

export const apiGee = axios.create({
  baseURL: '/api/apiGee',
  headers: {
    'Content-Type': 'application/json',
  },
  validateStatus: function (status) {
    return status >= 200 && status < 500;
  },
});

export function configureHeaders(
  request: InternalAxiosRequestConfig<any>,
  accessToken: string
): InternalAxiosRequestConfig {
  const url = request.url;
  if (url !== '/gettoken') {
    if (!request.headers['Authorization']) {
      request.headers['Authorization'] = `Bearer ${accessToken}`;
    }
  }

  return request;
}
