import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
//Internal app
import { decryptForge, encryptForge } from '@/utils/toolHelper';
import { SESSION_ID, TIME_SESSION_REDIS } from '@/utils/constants';
import { createRedisInstance, getRedis, postRedis } from '@/utils/redis';
import { decryptJWE, delRedis, getEnvVariable, handleResponse, putRedis } from '@/utils';
import logger from '@/utils/logger';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const uuidCookie =
      cookies().get(SESSION_ID)?.value || encryptForge(request.headers.get('X-Session-Mobile')) || null;
    const reqData = searchParams.get('reqData') || 'session:' + uuidCookie;
    const resData: string = (await getRedis(reqData)) || '';
    const data = resData ? encryptForge(resData) : '';

    return new NextResponse(JSON.stringify({ data }), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Failed to get Data' }), { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const uuidCookie =
      cookies().get(SESSION_ID)?.value || encryptForge(request.headers.get('X-Session-Mobile')) || null;
    const dataBody = await request.json();
    const decryptData = JSON.parse(decryptForge(dataBody.data));
    const uuid = decryptData.uuid ? decryptData.uuid : 'session:' + uuidCookie;

    if (decryptData.dataRedis === 'get') {
      const resData: string = (await getRedis(decryptData.uuid)) || '';
      return new NextResponse(JSON.stringify(resData), { status: 200 });
    } else {
      await postRedis(uuid, dataBody.dataRedis);
      return new NextResponse(JSON.stringify({ code: '200.00.000', message: 'ok' }), { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ code: '500.00.000', message: 'Fail' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const uuidCookie =
      cookies().get(SESSION_ID)?.value || encryptForge(request.headers.get('X-Session-Mobile')) || null;
    const dataBody = await request.json();
    const decryptData = JSON.parse(decryptForge(dataBody.data));
    const uuid = decryptData.uuid ? decryptData.uuid : 'session:' + uuidCookie;

    try {
      const redis = createRedisInstance();
      const data = decryptData.data;
      const dataRedis: string | null = await redis.get(`${uuid}`);
      let stateObject: any;

      if (dataRedis) {
        stateObject = JSON.parse(dataRedis);
        const newObject = { ...stateObject, ...data };
        await redis.set(`${uuid}`, JSON.stringify(newObject));
      }

      await redis.expire(`${uuid}`, TIME_SESSION_REDIS);

      redis.quit();
    } catch (error) {
      throw new Error('Error put data Redis: ');
    }

    const res = { data: { code: '200.00.000', message: 'ok' } };
    const response = encryptForge(JSON.stringify(res));

    return new NextResponse(JSON.stringify({ data: response }), { status: 200 });
  } catch (error) {
    return NextResponse.json({ code: '500.00.000', message: 'Fail' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const { url, method } = request;

  try {

    const encryptedBody = await request.json();
    const { data } = encryptedBody;
    const jwePrivateKey = getEnvVariable('MIDDLE_JWE_PRIVATE_KEY');
    const jwsPrivateKey = getEnvVariable('MIDDLE_JWS_PRIVATE_KEY');

    const decryptedPayload = await decryptJWE(data, jwePrivateKey);

    logger.debug('Request middleware Web %s', JSON.stringify({ method, reqUrl: url, body: decryptedPayload }));

    const { key, delParam, jwePublicKey } = decryptedPayload as { key: string, delParam: string; jwePublicKey: string};

    const uuid = cookies().get(SESSION_ID)?.value || encryptForge(request.headers.get('X-Session-Mobile')) || null;
    const redis = createRedisInstance();

    let keyRedis = (key) ? key : `session:${uuid}`;
    const time = (keyRedis !== 'activeSession') ? TIME_SESSION_REDIS : 60 * 60 * 8;

    const dataRedis: string | null = await redis.get(keyRedis);

    if (dataRedis) {
      let stateObject = JSON.parse(dataRedis);
      delete stateObject[delParam];
      await redis.set(keyRedis, JSON.stringify(stateObject));
      await redis.expire(keyRedis, time);
      await redis.quit();
    }

     if (!key) {
      const stateObject = { login: false };
      await putRedis(`session:${uuid}`, stateObject);
     }

    request.headers.get('X-Session-Mobile') && await delRedis(`session:${encryptForge(request.headers.get('X-Session-Mobile'))}`);

    const responsePayload = { code: '200.00.000', message: 'Process Ok', data: { message: ''} };

    let response: NextResponse;
    response = await handleResponse(responsePayload, jwePublicKey, jwsPrivateKey, 200);
    return response;

  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Failed to get Data' }), { status: 500 });
  }
}