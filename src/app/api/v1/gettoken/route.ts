import { NextRequest, NextResponse } from 'next/server';
//Internal app
import { decryptJWE, getEnvVariable, handleResponse, signJWT } from '@/utils';

export async function POST(request: NextRequest) {
  try {
    const encryptedBody = await request.json();
    const { data } = encryptedBody;
    const jwePrivateKey = getEnvVariable('MIDDLE_JWE_PRIVATE_KEY');
    const jwSPrivateKey = getEnvVariable('MIDDLE_JWS_PRIVATE_KEY');

    const decryptedPayload = await decryptJWE(data, jwePrivateKey);

    const { jwePublicKey, jwsPublicKey } = decryptedPayload as { jwePublicKey: string; jwsPublicKey: string };

    const token = await signJWT(jwePrivateKey, { jwePublicKey, jwsPublicKey });

    const responsePayload = { code: '200.00.000', message: 'Process Ok', data: token };

    let response: NextResponse;

    response = await handleResponse(responsePayload, jwePublicKey, jwSPrivateKey);

    return response;
  } catch (error) {
    return NextResponse.json({ code: '500.00.000', message: 'Fail' }, { status: 500 });
  }
}
