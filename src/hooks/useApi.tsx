import { useContext, useEffect } from 'react';
import { api } from '@/utils/api';
import { verifyJWT } from '@/utils/jwt';
import { JWT_HEADER } from '@/utils/constants';
import { useJwtStore } from '@/store/jwtStore';

export function useApi() {
  const { setToken } = useJwtStore();

  useEffect(() => {
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

            setToken(jwtAuth);
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
  }, [setToken]);

  return api;
}
