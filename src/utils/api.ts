import uuid4 from 'uuid4';
import axios from 'axios';
//Internal app
import { useJwtStore, useKeyStore } from '@/store';
import { JWS_HEADER, JWT_HEADER } from './constants';
import { decryptJWE, encryptJWE, signJWE, verifyDetachedJWS, verifyJWT } from './jwt';

export const api = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (request) => {
    const jweApiPublicKey = process.env.NEXT_PUBLIC_MIDDLE_JWE_PUBLIC_KEY || '';
    const url = request.url;
    const data = request.data;

    if (url !== '/gettoken') {
      const token = useJwtStore.getState().token;
      const identifier = useJwtStore.getState().uuid;
      request.headers[JWT_HEADER] = token;
      request.headers['X-Request-Id'] = uuid4();
      request.headers['identifier'] = identifier;
    }

    if (data) {
      const jwe = await encryptJWE(data, jweApiPublicKey);
      const encryptedData = { data: jwe };
      request.data = encryptedData;

      if (url !== '/gettoken') {
        const jwsPrivateKey = useKeyStore.getState().jwsPrivateKey || '';
        const jws = await signJWE(jwsPrivateKey, jwe);
        request.headers[JWS_HEADER] = `JWS ${jws}`;
      }
    }

    return request;
  },

  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  async (response) => {
    const jwsApiPublicKey = process.env.NEXT_PUBLIC_MIDDLE_JWS_PUBLIC_KEY || '';
    const jwePrivateKey = useKeyStore.getState().jwePrivateKey || '';
    const jwtHeader = response.headers[JWT_HEADER];
    const data = response.data;

    if (data) {
      const payload = data.data;
      const jws = response.headers[JWS_HEADER];

      await verifyDetachedJWS(jws, jwsApiPublicKey, payload);

      const decryptedData = await decryptJWE(payload, jwePrivateKey);

      response.data = decryptedData;
    }

    if (jwtHeader) {
      await verifyJWT(jwtHeader, jwsApiPublicKey);
      useJwtStore.getState().setToken(jwtHeader);
    }

    return response;
  },

  async (error) => {
    const data = error.response.data;
    const jwsApiPublicKey = process.env.NEXT_PUBLIC_MIDDLE_JWS_PUBLIC_KEY || '';

    if (data) {
      const payload = data.data;
      const jwePrivateKey = useKeyStore.getState().jwePrivateKey || '';
      const jws = error.response.headers[JWS_HEADER];

      await verifyDetachedJWS(jws, jwsApiPublicKey, payload);

      const decryptedData = await decryptJWE(payload, jwePrivateKey);
      error.response.data.data = decryptedData;
    }

    return Promise.reject(error);
  }
);
