import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { apiClient } from './apiClient';
// import { SESSION_TOKEN, TOKEN } from './constants';

export async function authenticateUser(email: string, password: string) {
  const response = await apiClient.get(
    `/users?user=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
  );
  const { code, data } = response.data;

  if (code !== 0 || !data) {
    return { success: false, message: 'Autenticación fallida' };
  }

  return { success: true, data: data[0] };
}

export async function getUserInfo(id: number) {
  const response = await apiClient.get(`/users?id=${encodeURIComponent(id)}`);
  const { code, data } = response.data;

  if (code !== 0 || !data) {
    return { success: false, message: 'No se pudo obtener la información del usuario' };
  }

  return { success: true, data: data[0] };
}

// export function setTokenCookie(response: NextResponse, token: string) {
//   cookies().set(TOKEN, token, {
//     secure: true,
//     sameSite: process.env.NODE_ENV != 'production' ? 'lax' : 'strict',
//     maxAge: 60 * 60 * 2, //2h
//     path: '/',
//   });

//   return response;
// }
