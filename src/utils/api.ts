import axios from 'axios';
//Internal app
import { JWS_HEADER } from './constants';
import { decryptJWE, encryptJWE, signJWE, verifyDetachedJWS } from './jwt';
import { useKeyStore } from '@/store';

export const api = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (request) => {
    const jweApiPublicKey: string | undefined = process.env.NEXT_PUBLIC_MIDDLE_JWE_PUBLIC_KEY || '';
    const url = request.url;
    const data = request.data;

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
    const jwsApiPublicKey = process.env.NEXT_PUBLIC_MIDDLE_JWS_PUBLIC_KEY;
    const jwePrivateKey = useKeyStore.getState().jwePrivateKey || '';
    const url = response.config.url;
    const data = response.data;

    if (data) {
      const payload = data.data;
      if (jwsApiPublicKey) {
        const jws = response.headers[JWS_HEADER];
        if (jws) {
          await verifyDetachedJWS(jws, jwsApiPublicKey, payload);
        } else {
          return Promise.reject('JWS header not found in the response');
        }
      }
      const decryptedData = await decryptJWE(payload, jwePrivateKey);
      response.data = decryptedData;
    }
    return response;
  },

  async (error) => {
    const data = error.response.data;
    const jwsApiPublicKey = process.env.NEXT_PUBLIC_MIDDLE_JWS_PUBLIC_KEY;

    if (data) {
      const payload = data.data;
      const jwePrivateKey = useKeyStore.getState().jwePrivateKey || '';
      if (jwsApiPublicKey) {
        const jws = error.response.headers[JWS_HEADER];
        if (jws) {
          await verifyDetachedJWS(jws, jwsApiPublicKey, payload);
        } else {
          return Promise.reject('JWS header not found in the response');
        }
      }

      const decryptedData = await decryptJWE(payload, jwePrivateKey);
      error.response.data.data = decryptedData;
    }
    // return error;

    return Promise.reject(error);
  }
);
