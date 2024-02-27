//Internal app
import { apiClient } from './apiClient';

/**
 * Handle user authentication.
 *
 * @param email - User email.
 * @param password - User password.
 *
 * @returns Whether the user is authentic or not.
 */
export async function authenticateUser(email: string, password: string) {
  const response = await apiClient.get(
    `/users?user=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
  );
  const { code, data } = response.data;

  if (code !== 0 || !data) {
    return { success: false, message: 'Authentication failed' };
  }

  return { success: true, data: data[0] };
}

/**
 * Manage user information.
 *
 * @param id - User identification.
 *
 * @returns User information.
 */
export async function getUserInfo(id: number) {
  const response = await apiClient.get(`/users?id=${encodeURIComponent(id)}`);
  const { code, data } = response.data;

  if (code !== 0 || !data) {
    return { success: false, message: 'Could not get user information' };
  }

  return { success: true, data: data[0] };
}
