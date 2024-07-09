import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers'

//Internal app
import { createRedisInstance, getRedis, postRedis} from '@/utils/redis';
import { decryptForge, encryptForge } from '@/utils/toolHelper';
import { SESSION_ID } from '@/utils/constants';

export async function GET(request: NextRequest) {

  try {
    const searchParams = request.nextUrl.searchParams;
    const uuidCookie = cookies().get(SESSION_ID)?.value || null
    const reqData = searchParams.get('reqData') || 'session:'+ uuidCookie;
    const resData: string = await getRedis(reqData) || ''
    const data = encryptForge(resData)

    return new NextResponse(JSON.stringify({ data }), { status: 200 });

  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Failed to get Data' }), { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {

    const uuidCookie = cookies().get(SESSION_ID)?.value || null
    const dataBody = await request.json();
    const decryptData = JSON.parse(decryptForge(dataBody.data))
    const uuid = (uuidCookie) ? 'session:' + uuidCookie : dataBody.uuid

    if (decryptData.dataRedis === 'get') {
      const resData: string = await getRedis(decryptData.uuid) || ''
      return new NextResponse(JSON.stringify(resData), { status: 200 });
    } else {
      await postRedis(uuid, dataBody.dataRedis)
      return new NextResponse(JSON.stringify({ code: '200.00.000', message: 'ok' }), { status: 200 });
    }

  } catch (error) {
    return NextResponse.json({ code: '500.00.000', message: 'Fail' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {

    const uuidCookie = cookies().get(SESSION_ID)?.value || null
    const dataBody = await request.json();
    const decryptData = JSON.parse(decryptForge(dataBody.data));
    const uuid = (uuidCookie) ? 'session:' + uuidCookie : decryptData.uuid;

    try {
      const redis = createRedisInstance();
      const data = JSON.parse(decryptData.data)
      const dataRedis: string | null = await redis.get(`${uuid}`);
      let stateObject: any;

      if (dataRedis) {
        stateObject = JSON.parse(dataRedis);
        stateObject.state = Object.assign({}, stateObject.state, data.state);
        await redis.set(`${uuid}`, JSON.stringify(stateObject));
      }

      await redis.expire(`${uuid}`, 300);

      redis.quit();

    } catch (error) {
      throw new Error('Error put data Redis: ');
    }

    const res = { data: {code: '200.00.000', message: 'ok'} }
    const response = encryptForge(JSON.stringify(res))

    return new NextResponse(JSON.stringify({ data: response }), { status: 200 });

  } catch (error) {
    return NextResponse.json({ code: '500.00.000', message: 'Fail' }, { status: 500 });
  }
}
