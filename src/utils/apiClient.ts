import axios from 'axios';
import { getEnvVariable } from '@/utils/apiHelpers';

const baseURL = getEnvVariable('API_BASE_URL');

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (request) => {
    console.log('Request API RETO REACT');
    console.log({
      method: request.method,
      url: request.url,
      headers: request.headers,
      data: request.data,
    });
    return request;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    console.log('Response API RETO REACT');
    console.log(response.data);
    return response;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);
