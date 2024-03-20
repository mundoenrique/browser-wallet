import { useEffect } from 'react';
import { api, configureHeaders, handleRequest, handleResponse } from '@/utils/apiGee';
import { useOAuth2Store } from '@/store';

export function useApi() {
  const { accessToken } = useOAuth2Store();

  useEffect(() => {
    if (accessToken) {
      api.interceptors.request.use(
        async (request) => {
          configureHeaders(request, accessToken);
          // handleRequest(request);

          return request;
        },
        (error) => {
          console.error('Error in request:', error);
          return Promise.reject(error);
        }
      );

      api.interceptors.response.use(
        async (response) => {
          // handleResponse(response);

          return response;
        },
        (error) => {
          console.error('Error in response:', error);
          return Promise.reject(error);
        }
      );
    }
  }, [accessToken]);

  return api;
}
