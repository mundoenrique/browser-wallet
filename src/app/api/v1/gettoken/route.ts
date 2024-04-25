import { NextRequest, NextResponse } from 'next/server';
import uuid4 from 'uuid4';
//Internal app
import { decryptJWE, getEnvVariable, handleResponse, signJWT } from '@/utils';
import { postRedis } from '@/utils/redis';

export async function POST(request: NextRequest) {
  try {

    const uuid = uuid4();
    await postRedis(uuid, { uuid })

    const encryptedBody = await request.json();
    const { data } = encryptedBody;
    const jwePrivateKey = getEnvVariable('MIDDLE_JWE_PRIVATE_KEY');
    const jwsPrivateKey = getEnvVariable('MIDDLE_JWS_PRIVATE_KEY');

    const decryptedPayload = await decryptJWE(data, jwePrivateKey);

    const { jwePublicKey, jwsPublicKey } = decryptedPayload as { jwePublicKey: string; jwsPublicKey: string };

    const token = await signJWT(jwsPrivateKey, { jwePublicKey, jwsPublicKey });
    // const token = await signJWT(jwsPrivateKey, { jwePublicKey, jwsPublicKey });

    const responsePayload = { code: '200.00.000', message: 'Process Ok', data: { jwt: token, sessionId: uuid } };

    let response: NextResponse;

    response = await handleResponse(responsePayload, jwePublicKey, jwsPrivateKey);

    return response;
  } catch (error) {
    return NextResponse.json({ code: '500.00.000', message: 'Fail' }, { status: 500 });
  }
}
