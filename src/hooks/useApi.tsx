'use client';

import { useEffect } from 'react';
//Internal app
import { verifyJWT } from '@/utils/jwt';
import { JWT_HEADER } from '@/utils/constants';
import { useJwtStore, useKeyStore } from '@/store';
import { api, setJwtToken, setprivateKey } from '@/utils/api';

export function useApi() {
  const { token, setToken } = useJwtStore();
  const { privateKey } = useKeyStore();

  useEffect(() => {
    if (token && privateKey) {
      api.interceptors.request.use(
        async (request) => {
          const apiPublicKey: string | undefined = process.env.NEXT_PUBLIC_KEY;
          const url = request.url;

          if (!apiPublicKey) {
            return Promise.reject('API publicKey is not defined');
          }

          if (url !== '/auth/get-token') {
            console.log('default JWT_HEADER: ', api.defaults.headers.common[JWT_HEADER]);
            if (!api.defaults.headers.common[JWT_HEADER]) {
              setJwtToken(token);
              request.headers[JWT_HEADER] = token;
              setprivateKey(privateKey);
            }
          }

          return request;
        },
        (error) => {
          console.error('Error in request:', error);
          return Promise.reject(error);
        }
      );
    }

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
        console.error('Error in response:', error);
        return Promise.reject(error);
      }
    );
  }, [privateKey, setToken, token]);

  return api;
}
