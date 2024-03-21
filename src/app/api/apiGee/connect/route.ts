import { getEnvVariable } from '@/utils';
import { connect } from '@/utils/apiGeeServer';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const url = request.headers.get('x-url');
  request.headers.delete('x-url');
  // Se debe obtener la data y cifrarla para enviarla en el connect
  const encryptedData = {};

  if (url) {
    try {
      const response = await connect('get', url, request.headers, encryptedData);
      return NextResponse.json(response.data, { status: response.status });
    } catch (error) {
      console.log('Ha ocurrido un error: ', error);
      return NextResponse.json({ message: 'Ha ocurrido un error' }, { status: 500 });
    }
  }
  return NextResponse.json({ message: 'No url provided' }, { status: 400 });
}

export async function GET(request: NextRequest) {
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
