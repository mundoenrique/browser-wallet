import axios from 'axios';
//Internal app
import { JWS_HEADER, JWT_HEADER } from './constants';
import { decryptJWE, encryptJWE, signJWE, verifyDetachedJWS } from './jwt';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

let privateKey = '';

function setprivateKey(privKey: string) {
  privateKey = privKey;
}

function setJwtToken(token: string) {
  api.defaults.headers.common[JWT_HEADER] = token;
}

api.interceptors.request.use(
  async (request) => {
    const apiPublicKey: string | undefined = process.env.NEXT_PUBLIC_KEY;
    const url = request.url;
    const data = request.data;

    if (!apiPublicKey) {
      return Promise.reject('API publicKey is not defined');
    }

    if (!privateKey) {
      return Promise.reject('privateKey is not defined');
    }

    /**
     * Request API
     */

    if (data) {
      /**
       * Encrypt Data
       */
      const jwe = await encryptJWE(data, apiPublicKey);
      const encryptedData = { data: jwe };
      request.data = encryptedData;

      if (url !== '/auth/get-token') {
        const jws = await signJWE(privateKey, jwe);
        request.headers[JWS_HEADER] = jws;
      }
    }
    return request;
  },

  (error) => {
    return Promise.reject({
      message: 'Error in request',
      originalError: error,
    });
  }
);

api.interceptors.response.use(
  async (response) => {
    const apiPublicKey = process.env.NEXT_PUBLIC_KEY;
    const url = response.config.url;
    const data = response.data;

    /**
     * Response API
     */

    if (url === '/auth/generate-keys' || !privateKey) {
      return response;
    }

    if (data) {
      const payload = data.data;
      if (url !== '/auth/get-token' && apiPublicKey) {
        const jws = response.headers[JWS_HEADER];
        if (jws) {
          /**
           * Verify JWS...
           */
          await verifyDetachedJWS(jws, apiPublicKey, payload);
        } else {
          return Promise.reject('JWS header not found in the response');
        }
      }
      const decryptedData = await decryptJWE(payload, privateKey);
      console.log('decryptedData:', decryptedData);
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

export { api, setprivateKey, setJwtToken };
