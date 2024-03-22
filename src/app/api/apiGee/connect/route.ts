import { JWS_HEADER, decryptJWE, getEnvVariable, handleApiGeeRequest, handleApiGeeResponse, handleJWT } from '@/utils';
import { connect } from '@/utils/apiGeeServer';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const url = request.headers.get('x-url');
  request.headers.delete('x-url');

  const jweApiPublicKey = getEnvVariable('JWE_PUBLIC_KEY');
  const jweApiPrivateKey = getEnvVariable('JWE_PRIVATE_KEY');

  const payload = await request.json();
  const jwtPayload = await handleJWT(request, jweApiPublicKey);
  const jweAppPublicKey = jwtPayload.jwePublicKey;
  const jwsAppPublicKey = jwtPayload.jwsPublicKey;
  const data = await decryptJWE(payload.data, jweApiPrivateKey);

  const { jwe, jws } = await handleApiGeeRequest(data);

  request.headers.set(JWS_HEADER, `JWS ${jws}`);

  if (url) {
    try {
      const response = await connect('post', url, request.headers, { data: jwe });
      const encryptedResponse = await handleApiGeeResponse(response.data, jweAppPublicKey, jwsAppPublicKey);
      console.log('encryptedResponse: ', encryptedResponse);
      return encryptedResponse;
      // return NextResponse.json({ message: 'Ha ocurrido un error' }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: 'Ha ocurrido un error' }, { status: 500 });
    }
  }
  return NextResponse.json({ message: 'No url provided' }, { status: 400 });
}

export async function GET(request: NextRequest) {
  console.log('GET');
  const url = request.headers.get('x-url');
  request.headers.delete('x-url');

  const jweApiPublicKey = getEnvVariable('JWE_PUBLIC_KEY');
  const jweApiPrivateKey = getEnvVariable('JWE_PRIVATE_KEY');

  const jwtPayload = await handleJWT(request, jweApiPublicKey);
  const jweAppPublicKey = jwtPayload.jwePublicKey;
  const jwsAppPublicKey = jwtPayload.jwsPublicKey;

  if (url) {
    try {
      const response = await connect('get', url, request.headers);

      const encryptedResponse = await handleApiGeeResponse(response.data, jweAppPublicKey, jwsAppPublicKey);
      return encryptedResponse;
    } catch (error) {
      console.log('Ha ocurrido un error: ', error);
      return NextResponse.json({ message: 'Ha ocurrido un error' }, { status: 500 });
    }
  }
  return NextResponse.json({ message: 'No url provided' }, { status: 400 });
}
