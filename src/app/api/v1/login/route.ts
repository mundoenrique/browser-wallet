import { NextRequest } from 'next/server';
//Internal app
import { ICredentials } from '@/interfaces/api';
import { handleError, authenticateUser, handleApiRequest, handleApiResponse } from '@/utils';

export async function POST(request: NextRequest) {
  const { data, jweAppPublicKey, jwsAppPublicKey } = await handleApiRequest(request);
  const { email, password } = data as ICredentials;

  const result = await authenticateUser(email, password);

  if (!result.success) {
    return handleError('Invalid email or password', null, 401);
  }

  const userId: string = result.data.id;
  const responseObj = { code: '200.00.00', message: 'Inicio de sesión exitoso', data: userId };
  const response = handleApiResponse(responseObj, jweAppPublicKey, jwsAppPublicKey);

  return response;
}
