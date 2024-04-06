import { useEffect } from 'react';
import { apiGee, configureHeaders, handleRequest, handleResponse } from '@/utils/apiGeeConnect';
import { useJwtStore, useKeyStore } from '@/store';

export function useApi() {
  const { jwsPrivateKey, jwePrivateKey } = useKeyStore();
  const { token } = useJwtStore();
  useEffect(() => {
    if (jwsPrivateKey && token && jwePrivateKey) {
      apiGee.interceptors.request.use(
        async (request) => {
          request = configureHeaders(request, token);
          request = await handleRequest(request, jwsPrivateKey);

          return request;
        },
        (error) => {
          console.error('Error in request:', error);
          return Promise.reject(error);
        }
      );
      apiGee.interceptors.response.use(
        async (response) => {
          return await handleResponse(response, jwePrivateKey);
        },
        (error) => {
          console.error('Error in request:', error);
          return Promise.reject(error);
        }
      );
    }
  }, [jwsPrivateKey, token, jwePrivateKey]);

  return apiGee;
}
