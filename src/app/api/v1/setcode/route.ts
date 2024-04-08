import uuid4 from 'uuid4';
import { NextResponse, NextRequest } from 'next/server';
//Internal app
import { createRedisInstance } from '@/utils/redis';

export async function GET(request: NextRequest) {
  const redis = createRedisInstance();
  const searchParams = request.nextUrl.searchParams;
  const consultantCode = searchParams.get('consultantCode');
  const countryCode = searchParams.get('countryCode');
  const user = uuid4();

  await redis.set(`${user}`, JSON.stringify({ code: consultantCode, country: countryCode }));
  await redis.expire(`${user}`, 180);
  redis.quit();

  const response = {
    data: `/identify/${user}`,
  };

  return NextResponse.json(response, { status: 200 });
}
