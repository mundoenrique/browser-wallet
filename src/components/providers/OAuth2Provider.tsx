'use client';

import React, { useEffect } from 'react';
import { useOAuth2Store } from '@/store';
import { ChildrenProps } from '@/interfaces/constans';
import { api, configureAccessToken } from '@/utils/apiGee';

export const OAuth2Provider: React.FC<ChildrenProps> = ({ children }) => {
  const { accessToken, setAccessToken } = useOAuth2Store();
  const grant_type: string = 'client_credentials';
  const client_id: string | undefined = process.env.NEXT_PUBLIC_APIGEE_APP_CREDENTIALS_KEY;
  const client_secret: string | undefined = process.env.NEXT_PUBLIC_APIGEE_APP_CREDENTIALS_SECRET;

  useEffect(() => {
    if (!accessToken) {
      (async () => {
        try {
          const response = await api.post('/oauth2/v1/token', { grant_type, client_id, client_secret });
          const token = response.data?.['access_token'] as string;

          setAccessToken(token);
          configureAccessToken(token);
        } catch (error) {
          console.error('Error al generar el token OAuth2:', error);
        }
      })();
    } else {
      configureAccessToken(accessToken);
    }
  }, [accessToken, client_id, client_secret, setAccessToken]);

  return <>{children}</>;
};
