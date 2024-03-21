import { getEnvVariable } from '@/utils';
import { connect } from '@/utils/apiGeeServer';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // console.log('POST', request);
  const data = await request.json();
  // const body = await request;
  // console.log('POST request: ', body);
  // const url = request.headers.get('x-url');
  const url = request.nextUrl.pathname.replace('/apiGee', '/v0');
  console.log('url', url);
  console.log('data', data);
  // request.headers.delete('x-url');
  // Se debe obtener la data y cifrarla para enviarla en el connect
  const encryptedData = {};

  // if (url) {
  //   try {
  //     const response = await connect('post', url, request.headers, encryptedData);
  //     return NextResponse.json(response.data, { status: response.status });
  //   } catch (error) {
  //     console.log('Ha ocurrido un error: ', error);
  //     return NextResponse.json({ message: 'Ha ocurrido un error' }, { status: 500 });
  //   }
  // }
  return NextResponse.json({ message: 'No url provided' }, { status: 400 });
}

export async function GET(request: NextRequest) {
  console.log('GET request: ');

  const url = request.headers.get('x-url');
  request.headers.delete('x-url');

  if (url) {
    try {
      const response = await connect('get', url, request.headers);
      return NextResponse.json(response.data, { status: response.status });
      // Falta verificar si la data viene cifrada, descifrarla
    } catch (error) {
      console.log('Ha ocurrido un error: ', error);
      return NextResponse.json({ message: 'Ha ocurrido un error' }, { status: 500 });
    }
  }
  return NextResponse.json({ message: 'No url provided' }, { status: 400 });
}
