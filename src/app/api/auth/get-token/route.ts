import { NextRequest } from 'next/server';

import { decryptJWE, encryptJWE, getEnvVariable, handleError, signJWT } from '@/utils';

export async function POST(request: NextRequest) {
  try {
    const encryptedBody = await request.json();
    const { data } = encryptedBody;

    const privateKey = getEnvVariable('PRIVATE_KEY');

    // Desencriptar el JWE payload y obtener clave pública
    const decryptedPayload = await decryptJWE(data, privateKey);
    const { publicKey } = decryptedPayload as { publicKey: string };

    // Crear un JWT
    const token = await signJWT(privateKey, { publicKey });

    // Encriptar la respuesta con la clave pública recibida
    const responsePayload = { success: true, message: 'JWT creado con éxito', data: token };
    const encryptedResponse = await encryptJWE(responsePayload, publicKey);

    return Response.json({ data: encryptedResponse });
  } catch (error) {
    return handleError('Ha ocurrido un error al procesar la solicitud.', error);
  }
}
