import { NextRequest } from 'next/server';
//Internal app
import { decryptJWE, encryptJWE, getEnvVariable, handleError, signJWT } from '@/utils';

export async function POST(request: NextRequest) {
  try {
    const encryptedBody = await request.json();
    const { data } = encryptedBody;

    const privateKey = getEnvVariable('PRIVATE_KEY');

    /**
     * Decrypt the JWE payload and obtain public key.
     */
    const decryptedPayload = await decryptJWE(data, privateKey);
    const { publicKey } = decryptedPayload as { publicKey: string };

    /**
     *Create a JWT
     */
    const token = await signJWT(privateKey, { publicKey });

    /**
     * Encrypt the response with the received public key
     */
    const responsePayload = { success: true, message: 'JWT created successfully', data: token };
    const encryptedResponse = await encryptJWE(responsePayload, publicKey);

    return Response.json({ data: encryptedResponse });
  } catch (error) {
    return handleError('An error occurred while processing the request:', error);
  }
}
