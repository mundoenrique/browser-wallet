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
  const apiPublicKey = getEnvVariable('JWE_PUBLIC_KEY');
  const apiPrivateKey = getEnvVariable('JWE_PRIVATE_KEY');

  let jwtPayload: IJWTPayload;
  let appPublicKey: string;
  let credentials: ICredentials;

  try {
    jwtPayload = await handleJWT(request, apiPublicKey);
    appPublicKey = jwtPayload.publicKey;
    const data = await handleJWE(request, appPublicKey, apiPrivateKey);
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
    response = await handleResponse(responseObj, appPublicKey, apiPrivateKey);
  } catch (error) {
    return handleError((error as Error).message, error);
  }
  /**
   * Sign the JWT with the API privateKey, including the user ID
   */
  const jwt: string = await signJWT(apiPrivateKey, { publicKey: appPublicKey, id: userId });
  response.headers.set(JWT_HEADER, jwt);

  return response;
}
