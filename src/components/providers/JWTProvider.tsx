'use client';

import React, { useEffect } from 'react';
//Internal app
import { useApi } from '@/hooks/useApi';
import { setJwtToken } from '@/utils/api';
import { ChildrenProps } from '@/interfaces';
import { useKeyStore, useJwtStore } from '@/store';

export const JwtProvider: React.FC<ChildrenProps> = ({ children }) => {
  const { publicKey } = useKeyStore();
  const { token, setToken } = useJwtStore();
  const api = useApi();

  useEffect(() => {
    if (publicKey && !token) {
      (async () => {
        try {
          /**
           * Generando token JWT
           */
          const response = await api.post('/auth/get-token', { publicKey });
          const token = response.data.data as string;
          setToken(token);
          setJwtToken(token);
        } catch (error) {
          console.error('Error generating JWT token:', error);
        }
      })();
    }
  }, [api, publicKey, setToken, token]);

  return <>{children}</>;
};
