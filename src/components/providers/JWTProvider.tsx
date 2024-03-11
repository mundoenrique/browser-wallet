'use client';

import React, { useEffect } from 'react';
//Internal app
import { useApi } from '@/hooks/useApi';
import { setJwtToken } from '@/utils/api';
import { ChildrenProps } from '@/interfaces';
import { useKeyStore, useJwtStore } from '@/store';

export const JwtProvider: React.FC<ChildrenProps> = ({ children }) => {
  const { jwePublicKey, jwsPublicKey } = useKeyStore();
  const { token, setToken } = useJwtStore();
  const api = useApi();

  useEffect(() => {
    if (jwePublicKey && jwsPublicKey && !token) {
      (async () => {
        try {
          /**
           * Generando token JWT
           */
          const response = await api.post('/auth/get-token', { jwePublicKey, jwsPublicKey });
          const token = response.data.data as string;
          setToken(token);
          setJwtToken(token);
        } catch (error) {
          console.error('Error generating JWT token:', error);
        }
      })();
    }
  }, [api, jwePublicKey, jwsPublicKey, setToken, token]);

  return <>{children}</>;
};
