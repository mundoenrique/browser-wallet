import { NextRequest } from 'next/server';
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
import { ICredentials, IEncryptedBody, IJWTPayload, IPayload } from '@/interfaces/api';

export async function POST(request: NextRequest) {
  const apiPublicKey = getEnvVariable('PUBLIC_KEY');
  const apiPrivateKey = getEnvVariable('PRIVATE_KEY');

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

  // Procesar el payload y obtener la respuesta del backend
  const { email, password } = credentials;
  // Autentica al usuario con la API externa.
  const result = await authenticateUser(email, password);

  if (!result.success) {
    // Si la autenticación no es exitosa, devuelve un error.
    return handleError('Invalid email or password', null, 401);
  }

  const userId: string = result.data.id;

  // Crea el objeto de respuesta.
  const responseObj = { success: true, message: 'Inicio de sesión exitoso', data: userId };

  // Maneja la creación de la respuesta
  let response: Response;
  try {
    response = await handleResponse(responseObj, appPublicKey, apiPrivateKey);
  } catch (error) {
    return handleError((error as Error).message, error);
  }

  // Firmar el JWT con la privateKey de la API, incluyendole el id del usario
  const jwt: string = await signJWT(apiPrivateKey, { publicKey: appPublicKey, id: userId });
  response.headers.set(JWT_HEADER, jwt);

  // Enviar la respuesta
  return response;
}
