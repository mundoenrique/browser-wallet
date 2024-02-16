import { NextRequest } from 'next/server';
import { getEnvVariable, handleError, getUserInfo, handleResponse, verifyJWT, JWT_HEADER } from '@/utils';
import { IJWTPayload } from '@/interfaces/api';

export async function GET(request: NextRequest) {
  const apiPublicKey = getEnvVariable('PUBLIC_KEY');
  const apiPrivateKey = getEnvVariable('PRIVATE_KEY');

  let jwtPayload: IJWTPayload;

  try {
    const jwt: string | null = request.headers.get(JWT_HEADER);

    if (!jwt) {
      throw new Error('No se proporcionó el JWT. Por favor, asegúrate de que tu solicitud incluye un JWT válido.');
    }

    jwtPayload = (await verifyJWT(jwt, apiPublicKey)) as unknown as IJWTPayload;
  } catch (error) {
    return handleError('Error al verificar el JWT: ', error, 400);
  }

  const appPublicKey: string = jwtPayload.publicKey;
  const id: number = jwtPayload.id as number;

  // Procesar el payload y obtener la respuesta del backend
  const result = await getUserInfo(id);

  if (!result.success) {
    return handleError('User not found', null, 404);
  }

  // Crea el objeto de respuesta.
  const responseObj = { success: true, data: result.data };

  // Maneja la creación y envío de la respuesta
  try {
    return await handleResponse(responseObj, appPublicKey, apiPrivateKey);
  } catch (error) {
    return handleError((error as Error).message, error, 500);
  }
}
