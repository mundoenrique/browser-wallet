import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: Request) {
  const XRequestId = req.headers.get('X-Request-Id');
  const { searchParams } = new URL(req.url);
  const data = {
    method: req.method,
    XRequestId,
    consultantCode: searchParams.get('consultantCode'),
    countryCode: searchParams.get('countryCode'),
  };

  return NextResponse.json(data, { status: 200 });
}
