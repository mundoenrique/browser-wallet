import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  console.log('middleware');
  const url = request.nextUrl.clone();
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-url', url.pathname);

  if (url.pathname === '/api/apiGee/connect' || url.pathname === '/api/apiGee/gettoken') {
    return NextResponse.next();
  }

  let response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response = NextResponse.redirect(new URL('/api/apiGee/connect', request.url));

  return response;
}

export const config = {
  matcher: '/api/:path*',
};
