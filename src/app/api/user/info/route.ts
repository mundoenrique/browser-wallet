import { NextRequest } from 'next/server';
//Internal app
import { IJWTPayload } from '@/interfaces/api';
import { getEnvVariable, handleError, getUserInfo, handleResponse, verifyJWT, JWT_HEADER } from '@/utils';

export async function GET(request: NextRequest) {
  const jweApiPublicKey = getEnvVariable('JWE_PUBLIC_KEY');
  const jwsApiPrivateKey = getEnvVariable('JWS_PRIVATE_KEY');

  let jwtPayload: IJWTPayload;

  try {
    const jwt: string | null = request.headers.get(JWT_HEADER);

    if (!jwt) {
      throw new Error('JWT was not provided. Please make sure your request includes a valid JWT.');
    }

    jwtPayload = (await verifyJWT(jwt, jweApiPublicKey)) as unknown as IJWTPayload;
  } catch (error) {
    return handleError('Error verifying JWT: ', error, 400);
  }

  const jweAppPublicKey = jwtPayload.jwePublicKey;
  const id: number = jwtPayload.id as number;

  /**
   * Process the payload and get the response from the backend
   */
  const result = await getUserInfo(id);

  if (!result.success) {
    return handleError('User not found', null, 404);
  }

  /**
   * Create the response object
   */
  const responseObj = { success: true, data: result.data };

  /**
   * Handles the creation and sending of the response
   */
  try {
    return await handleResponse(responseObj, jweAppPublicKey, jwsApiPrivateKey);
  } catch (error) {
    return handleError((error as Error).message, error, 500);
  }
}
