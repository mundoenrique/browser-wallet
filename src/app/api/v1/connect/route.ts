import { JWS_HEADER, handleApiGeeRequest, handleApiGeeResponse, handleApiRequest } from '@/utils';
import { connect } from '@/utils/apiGeeServer';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const url = request.headers.get('x-url');
  request.headers.delete('x-url');

  const { data, jweAppPublicKey } = await handleApiRequest(request);

  const { jwe, jws } = await handleApiGeeRequest(data);

  request.headers.set(JWS_HEADER, `JWS ${jws}`);

  if (url) {
    try {
      const response = await connect('post', url, request.headers, { data: jwe });
      const encryptedResponse = await handleApiGeeResponse(response.data, jweAppPublicKey);
      return encryptedResponse;
    } catch (error) {
      return NextResponse.json({ message: 'Ha ocurrido un error' }, { status: 500 });
    }
  }
  return NextResponse.json({ message: 'No url provided' }, { status: 400 });
}

export async function GET(request: NextRequest) {
  const url = request.headers.get('x-url');
  request.headers.delete('x-url');

  const { data, jweAppPublicKey, jwsAppPublicKey } = await handleApiRequest(request);

  const { jwe, jws } = await handleApiGeeRequest(data);

  request.headers.set(JWS_HEADER, `JWS ${jws}`);

  if (url) {
    try {
      const response = await connect('get', url, request.headers);
      const encryptedResponse = await handleApiGeeResponse(response.data, jweAppPublicKey);
      return encryptedResponse;
    } catch (error) {
      return NextResponse.json({ message: 'Ha ocurrido un error' }, { status: 500 });
    }
  }

  return NextResponse.json({ message: 'No url provided' }, { status: 400 });
}
