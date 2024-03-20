import { getEnvVariable } from '@/utils';
import { connect } from '@/utils/apiGee';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  console.log('connect-POST');
  const TENANT_ID = getEnvVariable('TENANT_ID');
  const parameters = await req.json();
  console.log('handler-parameters:', parameters);
  const { method, url, data } = parameters;
  const response = await connect(method, url, data);
  return NextResponse.json(response.data, { status: 200 });
}

export async function GET(req: NextRequest) {
  console.log('connect-GET');
  const TENANT_ID = getEnvVariable('TENANT_ID');

  const url = req.headers.get('x-url');
  if (url) {
    const auth2_token = req.cookies.get('auth2_token');
    req.headers.set('Authorization', `Bearer ${auth2_token}`);
    req.headers.set('X-Tenant-Id', TENANT_ID);
    const response = await connect('GET', url, null);
    return NextResponse.json(response.data, { status: 200 });
  }
  return NextResponse.json({ message: 'No url provided' }, { status: 400 });
}
