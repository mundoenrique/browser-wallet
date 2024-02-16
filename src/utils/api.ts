import axios from 'axios';
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
    const apiPublicKey = process.env.NEXT_PUBLIC_KEY;
    const url = request.url;
    const data = request.data;

    console.log('--------------- Request API---------------');
    console.log('url:', url);

    if (url === '/auth/generate-keys' || !apiPublicKey) {
      return request;
    }

    if (data) {
      console.log('data:', data);
      const jwe = await encryptJWE(data, apiPublicKey);
      const encryptedData = { data: jwe };
      console.log('encryptedData:', encryptedData);
      request.data = encryptedData;

      if (url !== '/auth/get-token') {
        const jws = await signJWE(privateKey, jwe);
        request.headers[JWS_HEADER] = jws;
      }
    }

    return request;
  },
  (error) => {
    console.error('Error in request:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  async (response) => {
    const apiPublicKey = process.env.NEXT_PUBLIC_KEY;
    const url = response.config.url;
    const data = response.data;

    console.log('--------------- Response API---------------');
    console.log('url:', url);
    console.log('status:', response.status);
    console.log('data:', data);

    if (url === '/auth/generate-keys' || !privateKey) {
      return response;
    }

    if (data) {
      const payload = data.data;
      if (url !== '/auth/get-token' && apiPublicKey) {
        const jws = response.headers[JWS_HEADER];
        if (jws) {
          console.log('Verificando JWS...');
          await verifyDetachedJWS(jws, apiPublicKey, payload);
          console.log('JWS válido');
        } else {
          console.log('JWS header not found in the response');
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
    console.error('Error in response:', error);
    return Promise.reject(error);
  }
);

export { api, setprivateKey, setJwtToken };
