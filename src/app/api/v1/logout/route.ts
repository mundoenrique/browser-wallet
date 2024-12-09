import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
//Internal app
import logger from '@/utils/logger';
import { delRedis } from '@/utils/redis';
import { SESSION_ID } from '@/utils/constants';

export async function GET(request: NextRequest) {
  try {
    const uuid = cookies().get(SESSION_ID)?.value ?? request.headers.get('X-Session-Mobile') ?? null;

    logger.debug('Delete session Redis  %s', JSON.stringify({ session: uuid }));

    await delRedis(`session:${uuid}`);

    return new NextResponse(JSON.stringify({ code: '200.00.000', message: 'ok' }), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Failed to get Data' }), { status: 500 });
  }
}
