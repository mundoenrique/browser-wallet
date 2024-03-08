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
    ...request,
  };

  return NextResponse.json(data, { status: 200 });
}
