'use client';

import uuid4 from 'uuid4';
//Internal app
import { api } from '@/utils/api';
import { verifyJWT } from '@/utils/jwt';
import { JWT_HEADER, SESSION_ID } from '@/utils/constants';
import { useJwtStore, useKeyStore } from '@/store';

export function useApi() {
  const { token, setToken } = useJwtStore();
  const { sessionId } = useJwtStore();
  const { jwePrivateKey, jwsPrivateKey } = useKeyStore();

  if (token && jwePrivateKey && jwsPrivateKey) {
    api.interceptors.request.use(
      async (request) => {
        const jweApiPublicKey = process.env.NEXT_PUBLIC_MIDDLE_JWE_PUBLIC_KEY;
        const url = request.url;

        if (!jweApiPublicKey) {
          return Promise.reject('API publicKey is not defined');
        }

        if (url !== '/gettoken') {
          request.headers[JWT_HEADER] = token;
          request.headers['X-Request-Id'] = uuid4();
          request.headers[SESSION_ID] = sessionId;
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
      const jwsApiPublicKey = process.env.NEXT_PUBLIC_MIDDLE_JWS_PUBLIC_KEY;

      if (url === '/gettoken') {
        return response;
      }

      if (jwtAuth) {
        if (jwsApiPublicKey) {
          await verifyJWT(jwtAuth, jwsApiPublicKey);

          setToken(jwtAuth);
        } else {
          return Promise.reject('jwsApiPublicKey is undefined');
        }
        return response;
      }

      return response;
    },
    async (error) => {
      return Promise.reject(error);
    }
  );

  return api;
}
