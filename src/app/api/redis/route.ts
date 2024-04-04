//Internal app

import { createRedisInstance } from '@/utils/redis';
import { NextResponse } from 'next/server';

export async function GET() {

  const redis = createRedisInstance();

  try {
    await redis.set(`session:ConectOk`, JSON.stringify({ accessToken: 'token' }));
    return new NextResponse(JSON.stringify({ redis: 'ok'}), {
      status: 200,
    });
  } catch (error) {
    console.error('Error setting Redis session:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to set session' }), {
      status: 500,
    });
  }
}