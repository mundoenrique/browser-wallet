import axios from 'axios';
//Internal app
import { JWS_HEADER, JWT_HEADER } from './constants';
import { decryptJWE, encryptJWE, signJWE, verifyDetachedJWS } from './jwt';

const api = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

let jwePrivateKey = '';
let jwsPrivateKey = '';

function setprivateKeys(_jwePrivateKeyy: string, _jwsPrivateKey: string) {
  jwePrivateKey = _jwePrivateKeyy;
  jwsPrivateKey = _jwsPrivateKey;
}

function setJwtToken(jwt: string) {
  api.defaults.headers.common[JWT_HEADER] = jwt;
}

api.interceptors.request.use(
  async (request) => {
    const jweApiPublicKey = process.env.NEXT_PUBLIC_MIDDLE_JWE_PUBLIC_KEY as string;
    const data = request.data;

    if (data) {
      const jwe = await encryptJWE(data, jweApiPublicKey);
      const encryptedData = { data: jwe };
      request.data = encryptedData;

      const jws = await signJWE(jwsPrivateKey, jwe);
      request.headers[JWS_HEADER] = `JWS ${jws}`;
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

    /**
     * Response API
     */

    if (!jwePrivateKey) {
      return response;
    }

    if (data) {
      const payload = data.data;
      if (jwsApiPublicKey) {
        const jws = response.headers[JWS_HEADER];
        if (jws) {
          /**
           * Verify JWS...
           */
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

export { api, setprivateKeys, setJwtToken };
