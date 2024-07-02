import { NextRequest, NextResponse } from 'next/server';
//Internal app
import logger from './logger';
import { handleApiResponse } from '.';
import { JWT_HEADER, JWS_HEADER, SESSION_ID } from './constants';
import { IApiGeeResponse, IEncryptedBody, IJWTPayload } from '@/interfaces';
import { verifyJWT, encryptJWE, decryptJWE, signJWE, verifyDetachedJWS } from './jwt';

type EnvVariableKey =
  | 'BACK_URL'
  | 'MIDDLE_JWE_PRIVATE_KEY'
  | 'MIDDLE_JWE_PUBLIC_KEY'
  | 'MIDDLE_JWS_PRIVATE_KEY'
  | 'MIDDLE_JWS_PUBLIC_KEY'
  | 'TENANT_ID'
  | 'BACK_JWE_PRIVATE_KEY'
  | 'WEB_URL';

/**
 * Function to handle errors in API requests.
 *
 * @param message - The error message to display.
 * @param error - The captured error (optional).
 * @param status - The HTTP status code to return (optional).
 * @returns A response with the error message and the HTTP status code.
 */
export function handleError(
  message: string,
  error: any = undefined,
  status: number | undefined = undefined
): NextResponse {
  if (error) {
    const errorMessage = error.message ? error.message : error;

    if (!status) {
      status = error.status ? error.status : 500;
    }

    return NextResponse.json({ message, error: errorMessage }, { status });
  } else {
    status = status ? status : 500;

    return NextResponse.json({ message }, { status });
  }
}

/**
 * Function to get the value of an environment variable.
 *
 * @param key - The key of the environment variable to get.
 * @returns The value of the environment variable.
 * @throws If the environment variable is not set.
 */
export function getEnvVariable(key: EnvVariableKey): string {
  const value = process.env[key];

  if (!value || value.length === 0) {
    throw new Error(`The environment variable ${key} is not set.`);
  }

  return value;
}

/**
 * Handles the extraction and verification of the JWT.
 *
 * @param request - The NextRequest request.
 * @param apiPublicKey - The API's public key.
 * @returns The JWT payload.
 * @throws If there is an error verifying the JWT.
 */
export async function handleJWT(request: NextRequest, apiPublicKey: string): Promise<IJWTPayload> {
  try {
    const jwtToken: string | null = request.headers.get(JWT_HEADER);

    if (!jwtToken) {
      throw new Error('JWT was not provided. Please make sure your request includes a valid JWT.');
    }

    const jwtPayload: IJWTPayload = (await verifyJWT(jwtToken, apiPublicKey)) as unknown as IJWTPayload;

    return jwtPayload;
  } catch (error) {
    throw new Error('Error in the handling of JWT: ' + (error as Error).message);
  }
}

/**
 * Handles the extraction, decryption of the JWE and verification of the JWS.
 *
 * @param request - The NextRequest request.
 * @param jwsAppPublicKey - The APP's public key.
 * @param jweApiPrivateKey - The API's private key.
 * @returns The decrypted data.
 * @throws If there is an error verifying the JWS or decrypting the JWE.
 */
export async function handleJWE(
  request: NextRequest,
  jwsAppPublicKey: string,
  jweApiPrivateKey: string
): Promise<object> {
  try {
    const encryptedBody: IEncryptedBody = await request.json();
    const paylaod: string = encryptedBody.data;
    const jws: string | null = request.headers.get(JWS_HEADER);
    await verifyDetachedJWS(jws, jwsAppPublicKey, paylaod);
    const data = await decryptJWE(paylaod, jweApiPrivateKey);

    return data;
  } catch (error) {
    throw new Error('Error in the handling of JWE: ' + (error as Error).message);
  }
}

/**
 * Handles the creation and sending of the response.
 *
 * @param responseObj - The response object.
 * @param jweAppPublicKey - The application's public key.
 * @param jwsApiPrivateKey - The API's private key.
 * @param status - The HTTP status code for the response. Defaults to 200.
 * @returns The encrypted and signed response.
 * @throws If there is an error encrypting or signing the response.
 */
export async function handleResponse(
  responseObj: any,
  jweAppPublicKey: string,
  jwsApiPrivateKey: string,
  status: number = 200,
  isBrowser: boolean = false,
): Promise<NextResponse> {
  try {
    let cookieSet:any = ''
    const jwe: string = await encryptJWE(responseObj, jweAppPublicKey);
    const encryptedResponse = { data: jwe };
    const jws: string = await signJWE(jwsApiPrivateKey, jwe);

    if (isBrowser) {
      cookieSet = `sessionId=${responseObj.data.sessionId}; HttpOnly=true; Path=/; Secure=true; SameSite=true`
    }

    const response = NextResponse.json(encryptedResponse, {
      status,
      headers: {
      'Set-Cookie': cookieSet,
      },
    });
    response.headers.set(JWS_HEADER, `JWS ${jws}`);

    return response;
  } catch (error) {
    throw new Error('Error in response handling: ' + (error as Error).message);
  }
}

export async function handleApiGeeRequest(data: object): Promise<any> {
  const jwe_public_key: string = process.env.BACK_JWE_PUBLIC_KEY || '';
  const jws_private_key: string = process.env.BACK_JWS_PRIVATE_KEY || '';

  try {
    const jwe: string = await encryptJWE(data, jwe_public_key);
    const jws: string = await signJWE(jws_private_key, jwe);

    return { jwe, jws };
  } catch (error) {
    throw new Error('Error in apiGee request handling: ' + (error as Error).message);
  }
}

export async function handleApiGeeResponse(
  responseObj: IApiGeeResponse,
  status: number,
  jweAppPublicKey: string
): Promise<any> {
  const jweApiGeePrivateKey = getEnvVariable('BACK_JWE_PRIVATE_KEY');

  if (responseObj.data) {
    const decryptData = await decryptJWE(responseObj.data, jweApiGeePrivateKey);
    responseObj.data = decryptData;
    const { data } = responseObj;

    logger.debug('Response services %s', JSON.stringify({ status, data }));
  }

  const response = await handleApiResponse(responseObj, status, jweAppPublicKey);

  return response;
}
