import { NextResponse, NextRequest } from 'next/server';

export async function PUT(req: Request) {
  const XRequestId = req.headers.get('X-Request-Id');
  const request = await req.json();
  const data = {
    method: req.method,
    XRequestId,
    ...request,
  };

  return NextResponse.json(data, { status: 200 });
}
