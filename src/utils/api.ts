import axios from 'axios';
//Internal app
import { JWS_HEADER, JWT_HEADER } from './constants';
import { decryptJWE, encryptJWE, signJWE, verifyDetachedJWS } from './jwt';

export const api = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

let jwePrivateKey = '';
let jwsPrivateKey = '';

export function setprivateKeys(_jwePrivateKeyy: string, _jwsPrivateKey: string) {
  jwePrivateKey = _jwePrivateKeyy;
  jwsPrivateKey = _jwsPrivateKey;
}

api.interceptors.request.use(
  async (request) => {
    const jweApiPublicKey: string | undefined = process.env.NEXT_PUBLIC_MIDDLE_JWE_PUBLIC_KEY;
    const url = request.url;
    const data = request.data;

    if (!jweApiPublicKey) {
      return Promise.reject('API publicKey is not defined');
    }

    if (!jwsPrivateKey) {
      return Promise.reject('jwsPrivateKey is not defined');
    }

    if (data) {
      const jwe = await encryptJWE(data, jweApiPublicKey);
      const encryptedData = { data: jwe };
      request.data = encryptedData;

      if (url !== '/gettoken') {
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
    const url = response.config.url;
    const data = response.data;

    if (!jwePrivateKey) {
      return response;
    }

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

  (error) => {
    return Promise.reject({
      message: 'Error in response',
      originalError: error,
    });
  }
);
