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

  console.log('Decrypted data: ', JSON.stringify(data, null, 2));

  return {
    data,
    jweAppPublicKey,
    jwsAppPublicKey,
  };
}

export async function handleApiResponse(response: object | null, jweAppPublicKey: string) {
  const jwsApiPrivateKey = getEnvVariable('JWS_PRIVATE_KEY');

  const data = await handleResponse(response, jweAppPublicKey, jwsApiPrivateKey);

  return data;
}

function decryptJWE(paylaod: string, jweApiPrivateKey: string) {
  throw new Error('Function not implemented.');
}
