import { useEffect } from 'react';
import { apiGee, configureHeaders, handleRequest } from '@/utils/apiGeeConnect';
import { useJwtStore, useKeyStore, useOAuth2Store } from '@/store';

export function useApi() {
  const { accessToken } = useOAuth2Store();
  const { jwsPrivateKey } = useKeyStore();
  const { token } = useJwtStore();
  useEffect(() => {
    if (accessToken && jwsPrivateKey && token) {
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
    }
  }, [accessToken]);

  return apiGee;
}
