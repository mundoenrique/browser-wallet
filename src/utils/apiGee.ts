import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { decryptJWE, encryptJWE, signJWE } from './jwt';

export const api = axios.create({
  baseURL: process.env.APIGEE_HOST,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
  },
});

export function configureAccessToken(token: string) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export async function configureHeaders(request: InternalAxiosRequestConfig<any>, accessToken: string) {
  const url = request.url;

  if (url !== '/oauth2/v1/token') {
    request.headers['X-Tenant-Id'] = process.env.TENANT_ID;
    if (!request.headers['Authorization']) {
      configureAccessToken(accessToken);
      request.headers['Authorization'] = `Bearer ${accessToken}`;
    }
  }

  return request;
}

export async function getToken() {
  const grant_type: string = 'client_credentials';
  const client_id: string | undefined = process.env.APIGEE_APP_CREDENTIALS_KEY;
  const client_secret: string | undefined = process.env.APIGEE_APP_CREDENTIALS_SECRET;
  const response = await api.post(`/oauth2/v1/token`, { grant_type, client_id, client_secret });
  console.log('response.data', response.data);

  const { data } = response;
  return data;
}

export async function connect(method: string, url: string, data: any) {
  const response = await api({
    method,
    url,
    data,
  });
  return response;
}

// export async function handleRequest(request: InternalAxiosRequestConfig<any>) {
//   const data = request.data;
//   const url = request.url;
//   const jwePublicKey: string | undefined = process.env.NEXT_PUBLIC_APIGEE_JWE_PUBLIC_KEY;
//   const jwsPrivateKey: string | undefined = process.env.NEXT_PUBLIC_APIGEE_JWS_PRIVATE_KEY;

//   if (url !== '/oauth2/v1/token' && data) {
//     /**
//      * Encrypt Data and sign JWE
//      */
//     if (!jwePublicKey) {
//       return Promise.reject('jwePublicKey is not defined');
//     }

//     if (!jwsPrivateKey) {
//       return Promise.reject('jwsPrivateKey is not defined');
//     }

//     const jwe = await encryptJWE(data, jwePublicKey);
//     const encryptedData = { data: jwe };
//     request.data = encryptedData;

//     const jws = await signJWE(jwsPrivateKey, jwe);
//     request.headers['X-token'] = 'JWS ' + jws;
//   }
//   return request;
// }

// export async function handleResponse(response: AxiosResponse<any, any>) {
//   const url = response.config.url;
//   const data = response.data;
//   const jwePrivateKey: string | undefined = process.env.NEXT_PUBLIC_APIGEE_JWE_PRIVATE_KEY;

//   if (url !== '/oauth2/v1/token' && data) {
//     if (!jwePrivateKey) {
//       return Promise.reject('jwePrivateKey is not defined');
//     }
//     /**
//      * Decrypt Data and sign JWE
//      */
//     const payload = data.data;

//     const decryptedData = await decryptJWE(payload, jwePrivateKey);
//     response.data = decryptedData;
//   }

//   return response;
// }
