import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { decryptJWE, encryptJWE, signJWE } from './jwt';
import { JWT_HEADER } from './constants';
import uuid4 from 'uuid4';

export const webApiSender = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  validateStatus: function (status) {
    return status >= 200 && status < 500;
  },
});

export function configureHeaders(request: InternalAxiosRequestConfig<any>, jwtToken: string | null) {
  request.headers[JWT_HEADER] = jwtToken;
  request.headers['X-Request-Id'] = uuid4();

  return request;
}

export async function handleRequest(request: InternalAxiosRequestConfig<any>, jwsPrivateKey: string | null) {
  const data = request.data;

  const jwePublicKey: string | undefined = process.env.NEXT_PUBLIC_MIDDLE_JWE_PUBLIC_KEY as string;

  console.log('handleRequest-url', request.url);
  console.log('handleRequest-data', data);

  const jwe = await encryptJWE(data, jwePublicKey);
  const encryptedData = { data: jwe };
  request.data = encryptedData;

  const jws = await signJWE(`${jwsPrivateKey}`, jwe);
  request.headers['X-token'] = 'JWS ' + jws;

  return request;
}

export async function handleResponse(response: AxiosResponse<any, any>, jwePrivateKey: string | null) {
  const data = response.data;
  const payload = data.data;

  const decryptedData = await decryptJWE(payload, `${jwePrivateKey}`);
  response.data = decryptedData;

  return response;
}
