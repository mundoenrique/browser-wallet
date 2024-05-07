'use client';

//Internal app
import { api } from '@/utils/api';

export function useApi() {
  api.interceptors.request.use(
    async (request) => {
      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    async (response) => {
      return response;
    },
    async (error) => {
      return Promise.reject(error);
    }
  );

  return api;
}
