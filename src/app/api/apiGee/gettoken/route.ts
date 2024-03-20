import { getToken } from '@/utils/apiGee';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const cookieStore = cookies();
  let cookieAuth = cookieStore.get('auth2_token');
  if (!cookieAuth) {
    const response = await getToken();
    const { access_token } = response;
    cookieStore.set('auth2_token', access_token);
    return NextResponse.json({ data: access_token, status: 200 });
  }
  return NextResponse.json({ data: cookieAuth.value, status: 200 });
}
