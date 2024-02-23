import { useEffect } from 'react';
import { api, configureAccessToken } from '@/utils/apiGee';
import { useOAuth2Store } from '@/store';

export function useApi() {
  const { accessToken } = useOAuth2Store();

  useEffect(() => {
    if (accessToken) {
      api.interceptors.request.use(
        async (request) => {
          const url = request.url;

          if (url !== process.env.NEXT_PUBLIC_APIGEE_HOST + '/oauth2/v1/token') {
            request.headers['X-Tenant-Id'] = process.env.NEXT_PUBLIC_TENANT_ID;
            console.log('default token OAuth2: ', api.defaults.headers.common['Authorization']);
            if (!api.defaults.headers.common['Authorization']) {
              configureAccessToken(accessToken);
              request.headers['Authorization'] = `Bearer ${accessToken}`;
            }
          }

          return request;
        },
        (error) => {
          console.error('Error in request:', error);
          return Promise.reject({
            message: 'Error in request',
            originalError: error,
          });
        }
      );
    }
  }, [accessToken]);

  return api;
}
