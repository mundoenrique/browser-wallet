import { useEffect } from 'react';
import { apiGee, configureHeaders } from '@/utils/apiGeeConnect';
import { useOAuth2Store } from '@/store';

export function useApi() {
  const { accessToken } = useOAuth2Store();

  useEffect(() => {
    if (accessToken) {
      apiGee.interceptors.request.use(
        async (request) => {
          request = configureHeaders(request, accessToken);
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
