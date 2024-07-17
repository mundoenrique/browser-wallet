import { NextResponse, type NextRequest } from 'next/server';
//Internal app
import { URL_BASE } from '@/utils/constants';
import { SESSION_ID } from './utils/constants';
import { encryptForge, setDataRedis } from './utils/toolHelper';

export async function middleware(request: NextRequest) {
  const { url, nextUrl } = request;
  const pathname = nextUrl.pathname;
  const partsUrl = pathname.split('/');
  const protectedApiV1 = ['/api/v1/connect', '/api/v1/gettoken', '/api/v1/setcode', '/api/v1/redis'];
  const protectedApiV0 = ['onboarding', 'catalogs', 'payments', 'users', 'cards'];
  const protectedRoutes = ['signin', 'signup', 'password-recover', 'qr', 'dashboard'];

  console.log('PATHNAME MIDDLEWARE ', partsUrl[1]);

  const isProtectedRoute = protectedRoutes.includes(partsUrl[1]);
  if (isProtectedRoute) {
    let uuid = request.cookies.get(SESSION_ID)?.value;
    const res = await setDataRedis('POST', { uuid: `session:${uuid}`, dataRedis: 'get' });

    if (!res) {
      const response = NextResponse.redirect(`${nextUrl.origin}/signout`);
      response.cookies.set(SESSION_ID, '', { httpOnly: false });

      return response;
    } else {
      const data = JSON.parse(res);

      if (data.accessSession.state.accessSession && partsUrl[1] === 'signin') {
        return NextResponse.redirect(`${nextUrl.origin}/dashboard`);
      } else {
        return NextResponse.next();
      }
    }
  }

  console.log('middleware-pathname: ', pathname);

  const isProtectedApiV1 = protectedApiV1.includes(pathname);

  if (isProtectedApiV1) {
    return NextResponse.next();
  }

  const url_api_name: string = partsUrl[3] || '';
  const resUrlBase = pathname.substring(pathname.indexOf(url_api_name) + url_api_name.length);
  const apiUrl: string = URL_BASE[url_api_name] + resUrlBase + nextUrl.search;
  const partsUrlApi = apiUrl.split('/');

  const isProtectedApiV0 = protectedApiV0.includes(partsUrlApi[2]);

  if (isProtectedApiV0) {

    let uuid = request.cookies.get(SESSION_ID)?.value || encryptForge(request.headers.get('X-Session-Mobile'));
    const res = await setDataRedis('POST', { uuid: `session:${uuid}`, dataRedis: 'get' });

    if (res) {
      const response = NextResponse.rewrite(new URL(protectedApiV1[0], url));
      response.headers.set('x-url', apiUrl);
      return response;
    } else {
      return NextResponse.redirect(`${nextUrl.origin}/signout`);
     }
  }
}

export const config = {
  matcher: ['/api/v1/:path*','/signin','/signup','/password-recover','/qr','/dashboard','/dashboard/:path*'],
};
