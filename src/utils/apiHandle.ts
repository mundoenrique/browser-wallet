import type { NextRequest } from 'next/server';
//Internal app
import { JWS_HEADER, getEnvVariable, handleJWE, handleJWT, handleResponse } from './';

export async function handleApiRequest(request: NextRequest) {
  const jwsApiPublicKey = getEnvVariable('MIDDLE_JWS_PUBLIC_KEY');
  const jweApiPrivateKey = getEnvVariable('MIDDLE_JWE_PRIVATE_KEY');
  let data = undefined;

  const jwtPayload = await handleJWT(request, jwsApiPublicKey);

  const jweAppPublicKey = jwtPayload.jwePublicKey;
  const jwsAppPublicKey = jwtPayload.jwsPublicKey;

  if (request.headers.get(JWS_HEADER)) {
    data = await handleJWE(request, jwsAppPublicKey, jweApiPrivateKey);
  }

  return {
    data,
    jweAppPublicKey,
    jwsAppPublicKey,
  };
}

export async function handleApiResponse(response: object | null, status: number, jweAppPublicKey: string) {
  const jwsApiPrivateKey = getEnvVariable('MIDDLE_JWS_PRIVATE_KEY');

  const data = await handleResponse(response, jweAppPublicKey, jwsApiPrivateKey, status);

  return data;
}
