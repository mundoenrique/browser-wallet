import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers'
import uuid4 from 'uuid4';
//Internal app
import { decryptJWE, getEnvVariable, handleResponse, signJWT, postRedis } from '@/utils';

export async function POST(request: NextRequest) {
  try {

    const uuid = uuid4();
    const stateObject = { state: { login: 'false' }, version: 0 };
    await postRedis(`session:${uuid}`, stateObject )

    const encryptedBody = await request.json();
    const { data } = encryptedBody;
    const jwePrivateKey = getEnvVariable('MIDDLE_JWE_PRIVATE_KEY');
    const jwsPrivateKey = getEnvVariable('MIDDLE_JWS_PRIVATE_KEY');

    const decryptedPayload = await decryptJWE(data, jwePrivateKey);

    const { jwePublicKey, jwsPublicKey, isBrowser } = decryptedPayload as { jwePublicKey: string; jwsPublicKey: string, isBrowser: boolean; };

    const token = await signJWT(jwsPrivateKey, { jwePublicKey, jwsPublicKey, uuid });

    const responsePayload = { code: '200.00.000', message: 'Process Ok', data: { jwt: token, sessionId: uuid } };

    let response: NextResponse;

    response = await handleResponse(responsePayload, jwePublicKey, jwsPrivateKey, 200, isBrowser);

    return response;
  } catch (error) {
    return NextResponse.json({ code: '500.00.000', message: 'Fail' }, { status: 500 });
  }
}
