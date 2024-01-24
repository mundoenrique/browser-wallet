import { NextRequest, NextResponse } from 'next/server';
import { IEncryptedBody, IJWTPayload } from '@/interfaces';
import { JWT_HEADER, JWS_HEADER } from './constants';
import { verifyJWT, encryptJWE, decryptJWE, signJWE, verifyDetachedJWS } from './jwt';

type EnvVariableKey = 'API_BASE_URL' | 'PRIVATE_KEY' | 'PUBLIC_KEY';

/**
 * Función para manejar errores en las solicitudes a la API.
 *
 * @param message - El mensaje de error a mostrar.
 * @param error - El error capturado (opcional).
 * @param status - El código de estado HTTP a devolver (opcional).
 * @returns Una respuesta con el mensaje de error y el código de estado HTTP.
 */
export function handleError(
  message: string,
  error: any = undefined,
  status: number | undefined = undefined
): NextResponse {
  if (error) {
    console.error(error);
    const errorMessage = error.message ? error.message : error;
    if (!status) {
      status = error.status ? error.status : 500;
    }
    return NextResponse.json({ message, error: errorMessage }, { status });
  } else {
    console.error(message);
    status = status ? status : 500;
    return NextResponse.json({ message }, { status });
  }
}

/**
 * Función para obtener el valor de una variable de entorno.
 *
 * @param key - La clave de la variable de entorno a obtener.
 * @returns El valor de la variable de entorno.
 * @throws Si la variable de entorno no está establecida.
 */
export function getEnvVariable(key: EnvVariableKey): string {
  const value = process.env[key];

  if (!value || value.length === 0) {
    console.error(`The environment variable ${key} is not set.`);
    throw new Error(`The environment variable ${key} is not set.`);
  }

  return value;
}

/**
 * Maneja la extracción y verificación del JWT.
 *
 * @param request - La solicitud NextRequest.
 * @param apiPublicKey - La clave pública de la API.
 * @returns El payload del JWT.
 * @throws Si hay un error al verificar el JWT.
 */
export async function handleJWT(request: NextRequest, apiPublicKey: string): Promise<IJWTPayload> {
  try {
    const jwtToken: string | null = request.headers.get(JWT_HEADER);

    if (!jwtToken) {
      throw new Error('No se proporcionó el JWT. Por favor, asegúrate de que tu solicitud incluye un JWT válido.');
    }

    const jwtPayload: IJWTPayload = (await verifyJWT(jwtToken, apiPublicKey)) as unknown as IJWTPayload;

    return jwtPayload;
  } catch (error) {
    throw new Error('Error en el manejo del JWT: ' + (error as Error).message);
  }
}

/**
 * Maneja la extracción, descifrado del JWE y verificación del JWS.
 *
 * @param request - La solicitud NextRequest.
 * @param appPublicKey - La clave publica de la APP.
 * @param apiPrivateKey - La clave privada de la API.
 * @returns Los datos descifrados.
 * @throws Si hay un error al verificar el JWS o descifrar el JWE.
 */
export async function handleJWE(request: NextRequest, appPublicKey: string, apiPrivateKey: string): Promise<object> {
  try {
    const encryptedBody: IEncryptedBody = await request.json();
    const paylaod: string = encryptedBody.data;
    const jws: string | null = request.headers.get(JWS_HEADER);

    await verifyDetachedJWS(jws, appPublicKey, paylaod);

    const data = await decryptJWE(paylaod, apiPrivateKey);
    return data;
  } catch (error) {
    throw new Error('Error en el manejo del JWE: ' + (error as Error).message);
  }
}

/**
 * Maneja la creación y envío de la respuesta.
 *
 * @param responseObj - El objeto de respuesta.
 * @param appPublicKey - La clave pública de la aplicación.
 * @param apiPrivateKey - La clave privada de la API.
 * @returns La respuesta encriptada y firmada.
 * @throws Si hay un error al encriptar o firmar la respuesta.
 */
export async function handleResponse(responseObj: any, appPublicKey: string, apiPrivateKey: string): Promise<Response> {
  try {
    const jwe: string = await encryptJWE(responseObj, appPublicKey);
    const encryptedResponse = { data: jwe };
    const jws: string = await signJWE(apiPrivateKey, jwe);

    const response = Response.json(encryptedResponse);
    response.headers.set(JWS_HEADER, jws);

    return response;
  } catch (error) {
    throw new Error('Error en el manejo de la respuesta: ' + (error as Error).message);
  }
}
