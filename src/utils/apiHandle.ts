import type { NextRequest } from 'next/server';
//Internal app
import { JWT_HEADER, getEnvVariable, handleJWE, handleJWT, handleResponse, signJWT } from './';

export async function handleApiRequest(request: NextRequest) {
  const jweApiPublicKey = getEnvVariable('JWE_PUBLIC_KEY');
  const jweApiPrivateKey = getEnvVariable('JWE_PRIVATE_KEY');

  const jwtPayload = await handleJWT(request, jweApiPublicKey);
  const jweAppPublicKey = jwtPayload.jwePublicKey;
  const jwsAppPublicKey = jwtPayload.jwsPublicKey;
  const data = await handleJWE(request, jwsAppPublicKey, jweApiPrivateKey);

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
