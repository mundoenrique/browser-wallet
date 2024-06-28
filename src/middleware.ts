import { NextResponse, type NextRequest } from 'next/server';
//Internal app
import { URL_BASE } from '@/utils/constants';

export async function middleware(request: NextRequest) {
  const { url, nextUrl } = request;
  const pathname = nextUrl.pathname;

  const SetCode = '/api/v1/setcode';
  const apiConnectUrl = '/api/v1/connect';
  const apiGetTokenAuthUrl = '/api/v1/gettoken';

  if (pathname === apiConnectUrl || pathname === apiGetTokenAuthUrl || pathname === SetCode) {
    return NextResponse.next();
  }

  const response = NextResponse.rewrite(new URL(apiConnectUrl, url));
  const partsUrl = pathname.split('/');
  const url_api_name: string = partsUrl[3] || '';
  const resUrlBase = pathname.substring(pathname.indexOf(url_api_name) + url_api_name.length);
  const apiUrl: string = URL_BASE[url_api_name] + resUrlBase + nextUrl.search;

  response.headers.set('x-url', apiUrl);

  return response;
}

export const config = {
  matcher: '/api/v1/:path*',
};
