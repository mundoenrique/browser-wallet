import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { url } = request;
  const pathname = request.nextUrl.pathname;
  const apiGeeConnectUrl = '/api/apiGee/connect';

  if (pathname === apiGeeConnectUrl || pathname === '/api/apiGee/gettoken') {
    return NextResponse.next();
  }

  const response = NextResponse.rewrite(new URL(apiGeeConnectUrl, url));
  response.headers.set('x-url', pathname.replace('/apiGee', '/v1.3'));
  return response;
}

export const config = {
  matcher: '/api/apiGee/:path*',
};
