'use client';

import React, { useEffect } from 'react';
//Internal app
import { useApi } from '@/hooks/useApi';
import { setJwtToken } from '@/utils/api';
import { ChildrenProps } from '@/interfaces';
import { useKeyStore, useJwtStore } from '@/store';

export default function JwtProvider({ children }: ChildrenProps): JSX.Element {
  const { jwePublicKey, jwsPublicKey } = useKeyStore();
  const { token, setToken } = useJwtStore();
  const api = useApi();

  useEffect(() => {
    if (!token) {
      if (jwePublicKey && jwsPublicKey) {
        (async () => {
          try {
            const response = await api.post('/gettoken', { jwePublicKey, jwsPublicKey });
            const token = response.data.data as string;
            setToken(token);
            setJwtToken(token);
          } catch (error) {
            console.error('Error generating JWT token:', error);
          }
        })();
      }
    } else {
      setJwtToken(token);
    }
  }, [api, jwePublicKey, jwsPublicKey, setToken, token]);

  return <>{children}</>;
}
