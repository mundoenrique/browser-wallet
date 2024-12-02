import uuid4 from 'uuid4';
import { NextRequest, NextResponse } from 'next/server';
//Internal app
import logger from '@/utils/logger';
import { encryptForge, fastModularExponentiation, generateAesKey, generatePublicKey } from '@/utils/toolHelper';
import { decryptJWE, getEnvVariable, handleResponse, signJWT, postRedis } from '@/utils';

export async function POST(request: NextRequest) {
  const { url, method } = request;

  try {
    const ipAddress = request.headers.get('X-Forwarded-For');
    let uuid = uuid4();

    const encryptedBody = await request.json();
    const { data } = encryptedBody;
    const jwePrivateKey = getEnvVariable('MIDDLE_JWE_PRIVATE_KEY');
    const jwsPrivateKey = getEnvVariable('MIDDLE_JWS_PRIVATE_KEY');

    const decryptedPayload = await decryptJWE(data, jwePrivateKey);

    const keysAes = generatePublicKey();

    logger.debug('Request middleware Web %s', JSON.stringify({ method, reqUrl: url, body: decryptedPayload }));

    const { jwePublicKey, jwsPublicKey, isBrowser, idDevice, exchange } = decryptedPayload as {
      jwePublicKey: string;
      jwsPublicKey: string;
      isBrowser: boolean;
      idDevice: string;
      exchange: number;
    };

    const primeNumber = parseInt(process.env.PRIME_NUMBER ?? '0');
    const secret = fastModularExponentiation(exchange, keysAes.keyPrivate, primeNumber);
    const exchangeKey = generateAesKey(secret);

    const deviceId = idDevice || null;
    const uuidSession = deviceId ? encryptForge(uuid, process.env.AES_KEY) : uuid;
    const stateObject = { login: false, ipAddress, uuid, deviceId, exchange: exchangeKey };

    await postRedis(`session:${uuidSession}`, stateObject);

    const token = await signJWT(jwsPrivateKey, { jwePublicKey, jwsPublicKey, uuid });

    const responsePayload = {
      code: '200.00.000',
      message: 'Process Ok',
      data: {
        jwt: token,
        sessionId: uuid,
        exchange: keysAes.keyPublic,
      },
    };

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
