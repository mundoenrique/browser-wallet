import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';
//Internal app
const logger = require('@/utils/logger');
import { options } from '@/utils/nextAuth';
import { decrypt, encryptToView } from '@/utils/encrypt_decrypt';

export async function POST(req: NextRequest) {
  const { payload } = await req.json();
  const reqData = JSON.parse(decrypt({ data:payload }));
  const session = await getServerSession(options);
  const ip = req.headers.get('x-forwarded-for');

  if (session) {
    logger[reqData.type]({ message: reqData.msg, user: session.user?.name, ip });
  } else {
    logger[reqData.type]({ message: reqData.msg });
  }

  const encryption = encryptToView({ code: 0, msg: 'ok' });

  return new NextResponse(JSON.stringify(encryption), {
    status: 200,
  });
}
