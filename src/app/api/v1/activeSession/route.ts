import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
//Internal app
import logger from '@/utils/logger';
import { SESSION_ID } from '@/utils/constants';
import { decryptJWE, getEnvVariable, handleResponse, putRedis } from '@/utils';

export async function POST(request: NextRequest) {
  try {
    const encryptedBody = await request.json();
    const { data } = encryptedBody;
    const jwePrivateKey = getEnvVariable('MIDDLE_JWE_PRIVATE_KEY');
    const jwsPrivateKey = getEnvVariable('MIDDLE_JWS_PRIVATE_KEY');

    const decryptedPayload: any = await decryptJWE(data, jwePrivateKey);

    const jwePublicKey = decryptedPayload.data.jwePublicKey;

    const uuid = cookies().get(SESSION_ID)?.value ?? request.headers.get('X-Session-Mobile') ?? null;

    const date = new Date();
    const stateObject = { timeSession: date.toString() };

    logger.debug('Renew user session %s', JSON.stringify({ stateObject }));

    await putRedis(`session:${uuid}`, stateObject);

    const responsePayload = { code: '200.00.000', message: 'Process Ok', data: { message: '' } };

    let response: NextResponse;
    response = await handleResponse(responsePayload, jwePublicKey, jwsPrivateKey, 200);
    return response;
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Failed to get Data' }), { status: 500 });
  }
}
