import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers'

//Internal app
import { getRedis, postRedis, putRedis } from '@/utils/redis';

export async function GET(request: NextRequest) {

  try {
    const searchParams = request.nextUrl.searchParams;
    const uuidCookie = cookies().get('sessionId')?.value || null
    const reqData = searchParams.get('reqData') || 'session:'+ uuidCookie;
    const resData:string = await getRedis(reqData) || ''

    return new NextResponse(JSON.stringify(resData), { status: 200 });

  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Failed to get Data' }), { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {

    const uuidCookie = cookies().get('sessionId')?.value || null

    const dataBody = await request.json();
    const uuid = (uuidCookie) ? 'session:' + uuidCookie : dataBody.uuid

    await postRedis(uuid, dataBody.dataRedis)

    return new NextResponse(JSON.stringify({ code: '200.00.000', message: 'ok' }), { status: 200 });

  } catch (error) {
    return NextResponse.json({ code: '500.00.000', message: 'Fail' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {

    const uuidCookie = cookies().get('sessionId')?.value || null
    const dataBody = await request.json();
    const uuid = (uuidCookie) ? 'session:' + uuidCookie : dataBody.uuid

    await putRedis(uuid, dataBody.dataRedis)

    return new NextResponse(JSON.stringify({ code: '200.00.000', message: 'ok' }), { status: 200 });

  } catch (error) {
    return NextResponse.json({ code: '500.00.000', message: 'Fail' }, { status: 500 });
  }
}
