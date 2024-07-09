import { NextRequest } from 'next/server';
import { cookies } from 'next/headers'
//Internal app
import { HandleCustomerRequest } from '@/utils/apiGeeServer';
import { createRedisInstance } from '@/utils';
import { SESSION_ID } from '@/utils/constants';

export async function GET(request: NextRequest) {
  refreshTime();
  return HandleCustomerRequest(request);
}

export async function POST(request: NextRequest) {
  refreshTime();
  return HandleCustomerRequest(request);
}

export async function PUT(request: NextRequest) {
  refreshTime();
  return HandleCustomerRequest(request);
}

export async function PATCH(request: NextRequest) {
  refreshTime();
  return HandleCustomerRequest(request);
}

function refreshTime() {
  const uuidCookie = cookies().get(SESSION_ID)?.value || null
  if (uuidCookie) {
    const redis = createRedisInstance();
    redis.expire(`session:${uuidCookie}`, 300);
  }
}
