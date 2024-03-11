import { NextRequest } from 'next/server';
//Internal app
import { ICredentials, IJWTPayload } from '@/interfaces/api';
import {
  signJWT,
  getEnvVariable,
  handleError,
  authenticateUser,
  JWT_HEADER,
  handleResponse,
  handleJWE,
  handleJWT,
} from '@/utils';

export async function POST(request: NextRequest) {
  const jweApiPublicKey = getEnvVariable('JWE_PUBLIC_KEY');
  const jweApiPrivateKey = getEnvVariable('JWE_PRIVATE_KEY');
  const jwsApiPrivateKey = getEnvVariable('JWS_PRIVATE_KEY');

  let jwtPayload: IJWTPayload;
  let jwsAppPublicKey: string;
  let jweAppPublicKey: string;
  let credentials: ICredentials;

  try {
    jwtPayload = await handleJWT(request, jweApiPublicKey);
    jweAppPublicKey = jwtPayload.jwePublicKey;
    jwsAppPublicKey = jwtPayload.jwsPublicKey;
    const data = await handleJWE(request, jwsAppPublicKey, jweApiPrivateKey);
    credentials = data as ICredentials;
  } catch (error) {
    return handleError((error as Error).message);
  }

  /**
   * Process the payload and get the response from the backend
   */
  const { email, password } = credentials;

  /**
   * Authenticates the user with the external API.
   */
  const result = await authenticateUser(email, password);

  if (!result.success) {
    /**
     * If authentication is not successful, return an error.
     */
    return handleError('Invalid email or password', null, 401);
  }

  const userId: string = result.data.id;

  /**
   * Create the response object.
   */
  const responseObj = { success: true, message: 'Inicio de sesión exitoso', data: userId };

  /**
   * Handle the creation of the response
   */
  let response: Response;
  try {
    response = await handleResponse(responseObj, jweAppPublicKey, jwsApiPrivateKey);
  } catch (error) {
    return handleError((error as Error).message, error);
  }
  /**
   * Sign the JWT with the API privateKey, including the user ID
   */
  const jwt: string = await signJWT(jweApiPrivateKey, {
    jwePublicKey: jweAppPublicKey,
    jwsPublicKey: jwsAppPublicKey,
    id: userId,
  });
  response.headers.set(JWT_HEADER, jwt);

  return response;
}
