import uuid4 from 'uuid4';
import { NextResponse, NextRequest } from 'next/server';
//Internal app
import { postRedis } from '@/utils/redis';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const consultantCode = searchParams.get('consultantCode');
  const countryCode = searchParams.get('countryCode');
  const user = uuid4();

  const data = { code: consultantCode, country: countryCode }
  await postRedis(user,data)

  const response = {
    data: `/identify/${user}`,
  };

  return NextResponse.json(response, { status: 200 });
}
