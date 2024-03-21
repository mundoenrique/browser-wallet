import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import uuid4 from 'uuid4';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const host = request.nextUrl.host;
  const protocol = request.nextUrl.protocol;
  const consultantCode = searchParams.get('consultantCode');
  const countryCode = searchParams.get('countryCode');
  const user = uuid4();

  cookies().set(`${user}`, `${consultantCode}-${countryCode}`, { maxAge: 120 });

  const response = {
    data: `${protocol}//${host}/identify/${user}`,
  };

  return NextResponse.json(response, { status: 200 });
}
