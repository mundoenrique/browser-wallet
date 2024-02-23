import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APIGEE_HOST,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
  },
});

export function configureAccessToken(token: string) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
