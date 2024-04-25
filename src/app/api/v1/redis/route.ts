import { NextRequest, NextResponse } from 'next/server';

//Internal app
import { getRedis, postRedis } from '@/utils/redis';

export async function GET(request: NextRequest) {

  try {
    const searchParams = request.nextUrl.searchParams;
    const reqData = searchParams.get('reqData') || '';
    const resData:string = await getRedis(`session:${reqData}`) || ''

    return new NextResponse(JSON.stringify(resData), { status: 200 });

  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Failed to get Data' }), { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {

    const dataBody = await request.json();
    postRedis(dataBody.uuid,dataBody.dataRedis)

    return new NextResponse(JSON.stringify({ code: '200.00.000', message: 'ok' }), { status: 200 });

  } catch (error) {
    return NextResponse.json({ code: '500.00.000', message: 'Fail' }, { status: 500 });
  }
}
