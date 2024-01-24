import { useContext, useEffect } from 'react';
import { JWTContext } from '@/app/Providers/JWTProvider';
import { api } from '@/utils/api';
import { verifyJWT } from '@/utils/jwt';
import { JWT_HEADER } from '@/utils/constants';

export function useApi() {
  const { updateToken } = useContext(JWTContext);

  useEffect(() => {
    if (updateToken) {
      api.interceptors.response.use(
        async (response) => {
          const url = response.config.url;
          const jwtAuth = response.headers[JWT_HEADER];
          const apiPublicKey = process.env.NEXT_PUBLIC_KEY;

          if (url === '/auth/generate-keys' || url === '/auth/get-token') {
            return response;
          }

          if (jwtAuth) {
            if (apiPublicKey) {
              await verifyJWT(jwtAuth, apiPublicKey);

              updateToken(jwtAuth);
            } else {
              return Promise.reject('apiPublicKey is undefined');
            }
            return response;
          }

          return response;
        },
        (error) => {
          console.error('Error in response: ', error);
          return Promise.reject(error);
        }
      );
    }
  }, [updateToken]);

  return api;
}
