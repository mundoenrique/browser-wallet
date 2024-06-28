import { NextRequest, NextResponse } from 'next/server';
//Internal app
import logger from '@/utils/logger';
import { decryptJWE, getEnvVariable, handleResponse, signJWT } from '@/utils';

export async function POST(request: NextRequest) {
  const { url, method, nextUrl, headers } = request;
  const { pathname } = nextUrl;

  try {
    const encryptedBody = await request.json();
    const { data } = encryptedBody;
    const jwePrivateKey = getEnvVariable('MIDDLE_JWE_PRIVATE_KEY');
    const jwsPrivateKey = getEnvVariable('MIDDLE_JWS_PRIVATE_KEY');

    const decryptedPayload = await decryptJWE(data, jwePrivateKey);
    logger.debug('Request middleware Web %s', JSON.stringify({ method, reqUrl: url, body: decryptedPayload }));

    const { jwePublicKey, jwsPublicKey } = decryptedPayload as { jwePublicKey: string; jwsPublicKey: string };

    const token = await signJWT(jwsPrivateKey, { jwePublicKey, jwsPublicKey });

    const responsePayload = { code: '200.00.000', message: 'Process Ok', data: token };

    logger.debug('Response middleware Web %s', JSON.stringify({ status: 200, data: responsePayload }));
    let response: NextResponse;

    response = await handleResponse(responsePayload, jwePublicKey, jwsPrivateKey);

    return response;
  } catch (error) {
    const data = { code: '500.00.000', message: 'Fail' };
    logger.error('Response middleware Web %s', JSON.stringify({ status: 500, data }));

    return NextResponse.json(data, { status: 500 });
  }
}
