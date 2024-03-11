'use client';

import { useEffect } from 'react';
//Internal app
import { verifyJWT } from '@/utils/jwt';
import { JWT_HEADER } from '@/utils/constants';
import { useJwtStore, useKeyStore } from '@/store';
import { api, setJwtToken, setprivateKeys } from '@/utils/api';

export function useApi() {
  const { token, setToken } = useJwtStore();
  const { jwePrivateKey, jwsPrivateKey } = useKeyStore();

  useEffect(() => {
    if (token && jwePrivateKey && jwsPrivateKey) {
      api.interceptors.request.use(
        async (request) => {
          const jweApiPublicKey: string | undefined = process.env.NEXT_PUBLIC_JWE_PUBLIC_KEY;
          const url = request.url;

          if (!jweApiPublicKey) {
            return Promise.reject('API publicKey is not defined');
          }

          if (url !== '/v1/gettoken') {
            if (!api.defaults.headers.common[JWT_HEADER]) {
              setJwtToken(token);
              request.headers[JWT_HEADER] = token;
              setprivateKeys(jwePrivateKey, jwsPrivateKey);
            }
          }

          return request;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    }

    api.interceptors.response.use(
      async (response) => {
        const url = response.config.url;
        const jwtAuth = response.headers[JWT_HEADER];
        const jweApiPublicKey = process.env.NEXT_PUBLIC_JWE_PUBLIC_KEY;

        if (url === '/auth/generate-keys' || url === '/v1/gettoken') {
          return response;
        }

        if (jwtAuth) {
          if (jweApiPublicKey) {
            await verifyJWT(jwtAuth, jweApiPublicKey);

            setToken(jwtAuth);
          } else {
            return Promise.reject('jwsApiPublicKey is undefined');
          }
          return response;
        }

        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }, [jwePrivateKey, jwsPrivateKey, setToken, token]);

  return api;
}
