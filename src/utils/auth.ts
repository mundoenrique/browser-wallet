import { apiClient } from './apiClient';

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
