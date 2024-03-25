import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { decryptJWE, encryptJWE, signJWE } from './jwt';
import { JWT_HEADER } from './constants';
import uuid4 from 'uuid4';

export const apiGee = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  validateStatus: function (status) {
    return status >= 200 && status < 500;
  },
});

export function configureHeaders(
  request: InternalAxiosRequestConfig<any>,
  accessToken: string,
  jwtToken: string
): InternalAxiosRequestConfig {
  const url = request.url;
  if (url !== '/gettokenAuth') {
    if (!request.headers['Authorization']) {
      request.headers['Authorization'] = `Bearer ${accessToken}`;
      request.headers[JWT_HEADER] = jwtToken;
      request.headers['X-Request-Id'] = uuid4();
    }
  }

  return request;
}

export async function handleRequest(
  request: InternalAxiosRequestConfig<any>,
  jwsPrivateKey: string
): Promise<InternalAxiosRequestConfig<any>> {
  const data = request.data;
  const url = request.url;
  const jwePublicKey: string | undefined = process.env.NEXT_PUBLIC_JWE_PUBLIC_KEY;

  console.log('handleRequest-url', request.url);
  console.log('handleRequest-data', data);

  if (url !== '/gettokenAuth' && data) {
    /**
     * Encrypt Data and sign JWE
     */
    if (!jwePublicKey) {
      return Promise.reject('jwePublicKey is not defined');
    }

    if (!jwsPrivateKey) {
      return Promise.reject('jwsPrivateKey is not defined');
    }

    const jwe = await encryptJWE(data, jwePublicKey);
    const encryptedData = { data: jwe };
    request.data = encryptedData;

    const jws = await signJWE(jwsPrivateKey, jwe);
    request.headers['X-token'] = 'JWS ' + jws;
  }
  return request;
}

export async function handleResponse(response: AxiosResponse<any, any>, jwePrivateKey: string) {
  const url = response.config.url;
  const data = response.data;

  if (url !== '/oauth2/v1/token' && data) {
    if (!jwePrivateKey) {
      return Promise.reject('jwePrivateKey is not defined');
    }
    /**
     * Decrypt Data and sign JWE
     */
    const payload = data.data;

    const decryptedData = await decryptJWE(payload, jwePrivateKey);
    response.data = decryptedData;
  }

  return response;
}
