import { type ApiParams } from '@/interfaces';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: Request, { params }: ApiParams) {
  const XRequestId = req.headers.get('X-Request-Id');
  const { userId } = params;

  const data = {
    method: req.method,
    XRequestId,
    userId,
  };

  return NextResponse.json(data, { status: 200 });
}
