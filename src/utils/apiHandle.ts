import type { NextRequest } from 'next/server';
//Internal app
import {
  JWS_HEADER,
  JWT_HEADER,
  getEnvVariable,
  handleJWE,
  handleJWT,
  handleResponse,
  signJWT,
  verifyDetachedJWS,
} from './';
import { IEncryptedBody } from '@/interfaces/api';

export async function handleApiRequest(request: NextRequest) {
  const requestCloneJWT = request;
  const requestCloneJWE = request;
  const jweApiPublicKey = getEnvVariable('JWE_PUBLIC_KEY');
  const jweApiPrivateKey = getEnvVariable('JWE_PRIVATE_KEY');

  const jwtPayload = await handleJWT(requestCloneJWT, jweApiPublicKey);

  const jweAppPublicKey = jwtPayload.jwePublicKey;
  const jwsAppPublicKey = jwtPayload.jwsPublicKey;

  const data = await handleJWE(requestCloneJWE, jwsAppPublicKey, jweApiPrivateKey);

  // const paylaod: string = encryptedBody.data;

  // const jws: string | null = request.headers.get(JWS_HEADER);

  console.log('handleJWE-data', data);

  return {
    data,
    jweAppPublicKey,
    jwsAppPublicKey,
  };
}

export async function handleApiResponse(response: object | null, jweAppPublicKey: string, jwsAppPublicKey: string) {
  const jweApiPrivateKey = getEnvVariable('JWE_PRIVATE_KEY');
  const jwsApiPrivateKey = getEnvVariable('JWS_PRIVATE_KEY');

  const data = await handleResponse(response, jweAppPublicKey, jwsApiPrivateKey);

  const jwt: string = await signJWT(jweApiPrivateKey, {
    jwePublicKey: jweAppPublicKey,
    jwsPublicKey: jwsAppPublicKey,
  });

  data.headers.set(JWT_HEADER, jwt);

  return data;
}

function decryptJWE(paylaod: string, jweApiPrivateKey: string) {
  throw new Error('Function not implemented.');
}
