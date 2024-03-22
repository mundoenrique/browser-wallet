import { useEffect } from 'react';
import { apiGee, configureHeaders, handleRequest, handleResponse } from '@/utils/apiGeeConnect';
import { useJwtStore, useKeyStore, useOAuth2Store } from '@/store';

export function useApi() {
  const { accessToken } = useOAuth2Store();
  const { jwsPrivateKey, jwePrivateKey } = useKeyStore();
  const { token } = useJwtStore();
  useEffect(() => {
    if (accessToken && jwsPrivateKey && token && jwePrivateKey) {
      apiGee.interceptors.request.use(
        async (request) => {
          request = configureHeaders(request, accessToken, token);
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
  }, [accessToken, jwsPrivateKey, token, jwePrivateKey]);

  return apiGee;
}
