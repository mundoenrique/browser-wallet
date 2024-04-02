import { ApiParams } from '@/interfaces';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: Request, { params }: ApiParams) {
  const XRequestId = req.headers.get('X-Request-Id');
  const { onboardingId } = params;
  const request = await req.json();
  const data = {
    method: req.method,
    XRequestId,
    onboardingId,
    data: {
      otpUuId: '5586c921-7706-4a3a-bdf7-ab6f7699f761',
    },
  };

  return NextResponse.json(data, { status: 200 });
}
