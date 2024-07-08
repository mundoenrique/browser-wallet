import { NextResponse, type NextRequest } from 'next/server';
//Internal app
import { URL_BASE } from '@/utils/constants';
import { createRedisInstance } from './utils';
import { setDataRedis } from './utils/toolHelper';
import { verifyAccess } from './utils/verifyAccess';

export async function middleware(request: NextRequest) {
  const { url, nextUrl } = request;
  const pathname = nextUrl.pathname;
  const partsUrl = pathname.split('/');
  const protectedApiV1 = ['/api/v1/connect','/api/v1/gettoken','/api/v1/setcode','/api/v1/redis']
  const protectedRoutes = ['signin', 'signup', 'password-recover', 'qr', 'dashboard']

  console.log('PATHNAME MIDDLEWARE ', partsUrl[1])

  const isProtectedRoute = protectedRoutes.includes(partsUrl[1]);
  if (isProtectedRoute) {
    let uuid = request.cookies.get('sessionId')?.value
    const res = await setDataRedis('POST', { uuid: `session:${uuid}`, dataRedis: 'get' });
    if (!res) {
      const response = NextResponse.redirect(nextUrl.origin + '/signout');
      response.cookies.set('sessionId', '', { httpOnly: false });

      return response
    } else {
      return NextResponse.next();
    }
  }

  console.log('middleware-pathname: ', pathname);

  const isProtectedApi = protectedApiV1.includes(pathname)

  if (isProtectedApi) {
    return NextResponse.next();
  }

  const response = NextResponse.rewrite(new URL(protectedApiV1[0], url));
  const url_api_name: string = partsUrl[3] || '';
  const resUrlBase = pathname.substring(pathname.indexOf(url_api_name) + url_api_name.length);
  const apiUrl: string = URL_BASE[url_api_name] + resUrlBase + nextUrl.search;

  response.headers.set('x-url', apiUrl);

  return response;
}

export const config = {
  matcher: ['/api/v1/:path*','/signin','/dashboard','/dashboard/:path*'],
};
