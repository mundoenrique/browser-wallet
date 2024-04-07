import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { URL_BASE } from '@/utils/constants';

export async function middleware(request: NextRequest) {
  const { url, method, nextUrl } = request;
  const pathname = nextUrl.pathname;

  const apiConnectUrl = '/api/v1/connect';
  const apiGetTokenAuthUrl = '/api/v1/gettoken';
  const SetCode = '/api/v1/setcode';

  console.log('middleware-pathname: ', pathname);

  if (pathname === apiConnectUrl || pathname === apiGetTokenAuthUrl || pathname === SetCode) {
    return NextResponse.next();
  }

  const response = NextResponse.rewrite(new URL(apiConnectUrl, url));
  const partsUrl = pathname.split('/');
  const url_api_name: string = partsUrl[3] || '';
  const resUrlBase = pathname.substring(pathname.indexOf(url_api_name) + url_api_name.length);
  const apiUrl: string = URL_BASE[url_api_name] + resUrlBase + nextUrl.search;
  response.headers.set('x-url', apiUrl);

  console.log(`backURL ${apiUrl}, method ${method}`);

  return response;
}

export const config = {
  matcher: '/api/v1/:path*',
};
