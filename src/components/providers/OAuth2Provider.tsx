'use client';

import React, { useEffect } from 'react';
//Internal app

import { ChildrenProps } from '@/interfaces/constans';
import { api } from '@/utils/apiGee';

export default function OAuth2Provider({ children }: ChildrenProps) {
  const grant_type: string = 'client_credentials';
  const client_id: string | undefined = process.env.NEXT_PUBLIC_APIGEE_APP_CREDENTIALS_KEY;
  const client_secret: string | undefined = process.env.NEXT_PUBLIC_APIGEE_APP_CREDENTIALS_SECRET;

  useEffect(() => {
    (async () => {
      try {
        const response = await api.post('/api/apiGee/gettoken', { grant_type, client_id, client_secret });
        console.log('response', response);

        const token = response.data?.['access_token'] as string;
      } catch (error) {
        console.error('Error generating OAuth2 token:', error);
      }
    })();
  }, [, client_id, client_secret]);

  return <>{children}</>;
}
