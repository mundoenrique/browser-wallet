'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { RSAKeyPairContext } from './RSAKeyPairProvider';
import { IData, JWTContextType, ProviderProps } from '@/interfaces';
import { verifyJWT } from '@/utils/jwt';
import { setJwtToken } from '@/utils/api';
import { useApi } from '@/hooks/useApi';
import SkeletonComponent from '@/components/UI/SkeletonComponent';
import { log } from 'winston';

export const JWTContext = createContext<JWTContextType>({});

export const JWTProvider = ({ children }: ProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const { publicKey } = useContext(RSAKeyPairContext);
  const [loading, setLoading] = useState(true);
  const api = useApi();
  const apiPublicKey = process.env.NEXT_PUBLIC_KEY;

  const getToken = async () => {
    if (publicKey && apiPublicKey) {
      try {
        console.log('Obteniendo JWT Token...');

        const { data: payload }: { data: IData<string> } = await api.post('/auth/get-token', { publicKey });
        const jwt = payload.data as string;

        try {
          const auth = await verifyJWT(jwt, apiPublicKey);
          if (auth) {
            setToken(jwt);
            setJwtToken(jwt);
          }
        } catch (error) {
          console.error('Error al verificar el JWT: ', error);
        }
      } catch (error) {
        console.error('Error al obtener el token: ', error);
      }
    }
    setLoading(false);
  };

  const updateToken = (newToken: string) => {
    setToken(newToken);
    setJwtToken(newToken);
  };

  useEffect(() => {
    if (!token) {
      getToken();
    }
  }, [publicKey, apiPublicKey]);

  return (
    <JWTContext.Provider value={{ token, updateToken }}>
      {loading ? <SkeletonComponent /> : children}
    </JWTContext.Provider>
  );
};
