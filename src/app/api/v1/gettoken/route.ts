import uuid4 from 'uuid4';
import { NextRequest, NextResponse } from 'next/server';
//Internal app
import logger from '@/utils/logger';
import { encryptForge } from '@/utils/toolHelper';
import { decryptJWE, getEnvVariable, handleResponse, signJWT, postRedis } from '@/utils';

export async function POST(request: NextRequest) {
  const { url, method } = request;

  try {
    const ipAddress = request.headers.get('X-Forwarded-For');
    const uuid = uuid4();

    const encryptedBody = await request.json();
    const { data } = encryptedBody;
    const jwePrivateKey = getEnvVariable('MIDDLE_JWE_PRIVATE_KEY');
    const jwsPrivateKey = getEnvVariable('MIDDLE_JWS_PRIVATE_KEY');

    const decryptedPayload = await decryptJWE(data, jwePrivateKey);

    logger.debug('Request middleware Web %s', JSON.stringify({ method, reqUrl: url, body: decryptedPayload }));

    const { jwePublicKey, jwsPublicKey, isBrowser, idDevice } = decryptedPayload as {
      jwePublicKey: string;
      jwsPublicKey: string;
      isBrowser: boolean;
      idDevice: string;
    };

    const deviceId = idDevice ? idDevice : null;
    const stateObject = { ipAddress, uuid, deviceId };
    await postRedis(`session:${encryptForge(uuid)}`, stateObject);

    const token = await signJWT(jwsPrivateKey, { jwePublicKey, jwsPublicKey, uuid });

    const responsePayload = { code: '200.00.000', message: 'Process Ok', data: { jwt: token, sessionId: uuid } };

    logger.debug('Response middleware Web %s', JSON.stringify({ status: 200, data: responsePayload }));

    let response: NextResponse;

    response = await handleResponse(responsePayload, jwePublicKey, jwsPrivateKey, 200, isBrowser);

    return response;
  } catch (error) {
    const data = { code: '500.00.000', message: 'Fail' };

    logger.error('Response middleware Web %s', JSON.stringify({ status: 500, data }));

    return NextResponse.json(data, { status: 500 });
  }
}
