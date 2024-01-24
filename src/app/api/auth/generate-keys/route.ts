import { NextRequest } from 'next/server';
import { generateKeyPairSync } from 'crypto';
import { handleError } from '@/utils/apiHelpers';

export async function GET(request: NextRequest) {
  try {
    const { publicKey, privateKey } = generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
      },
    });

    return Response.json({ publicKey, privateKey });
  } catch (error) {
    return handleError('Ha ocurrido un error al generar las claves RSA.', error);
  }
}
