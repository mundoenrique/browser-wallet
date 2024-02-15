'use client';

import React, { useEffect } from 'react';
import { useKeyStore, useJwtStore } from '@/store';
import { useApi } from '@/hooks/useApi';
import { ChildrenProps } from '@/interfaces/constant';

export const JwtProvider: React.FC<ChildrenProps> = ({ children }) => {
  const { publicKey } = useKeyStore();
  const { token, setToken } = useJwtStore();
  const api = useApi();

  useEffect(() => {
    if (publicKey && !token) {
      const generateJwtToken = async () => {
        try {
          console.log('Generando token JWT...');
          const response = await api.post('/auth/get-token', { publicKey });
          const token = response.data.data as string;

          setToken(token);
        } catch (error) {
          console.error('Error al generar el token JWT:', error);
        }
      };

      generateJwtToken();
    }
  }, [publicKey]);

  return <>{children}</>;
};
