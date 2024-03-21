import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { URL_BASE } from '@/utils/constants';

export async function middleware(request: NextRequest) {
  const { url } = request;
  const pathname = request.nextUrl.pathname;
  const apiGeeConnectUrl = '/api/apiGee/connect';
  if (pathname === apiGeeConnectUrl || pathname === '/api/apiGee/gettoken') {
    return NextResponse.next();
  }
  const response = NextResponse.rewrite(new URL(apiGeeConnectUrl, url));
  const partsUrl = pathname.split('/');
  const url_api_name: string = partsUrl[3] || '';
  const resUrlBase = pathname.substring(pathname.indexOf(url_api_name) + url_api_name.length);
  const apiGeeUrl: string = URL_BASE[url_api_name] + resUrlBase;

  response.headers.set('x-url', apiGeeUrl);
  return response;
}

export const config = {
  matcher: '/api/apiGee/:path*',
};
