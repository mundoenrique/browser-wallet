'use client';

import React, { useEffect } from 'react';
//Internal app

import { ChildrenProps } from '@/interfaces/constans';
import { useOAuth2Store } from '@/store/oAuth2Store';
import { apiGee } from '@/utils/apiGeeConnect';

export default function OAuth2Provider({ children }: ChildrenProps) {
  const { accessToken, setAccessToken } = useOAuth2Store();

  useEffect(() => {
    if (!accessToken) {
      (async () => {
        try {
          const response = await apiGee.post('/gettokenauth');
          setAccessToken(response.data.data);
        } catch (error) {
          console.error('Error generating OAuth2 token:', error);
        }
      })();
    }
  }, [accessToken, setAccessToken]);

  return <>{children}</>;
}
