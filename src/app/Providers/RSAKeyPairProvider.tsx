'use client';

import { createContext, useEffect, useState } from 'react';
import { ProviderProps, RSAKeysContextType } from '@/interfaces';
import { setKeyPair } from '@/utils/api';
import { useApi } from '@/hooks/useApi';

export const RSAKeyPairContext = createContext<RSAKeysContextType>({});

export const RSAKeyPairProvider = ({ children }: ProviderProps) => {
  const [privateKey, setPrivateKey] = useState<string | null>(null);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [keysGenerated, setKeysGenerated] = useState<boolean>(false);
  const api = useApi();

  const generateKeys = async () => {
    if (!keysGenerated && !privateKey && !publicKey) {
      try {
        console.log('Generando par de claves RSA...');

        const response = await api.get('/auth/generate-keys');
        const { publicKey, privateKey } = response.data;

        setKeysGenerated(true);
        setPrivateKey(privateKey);
        setPublicKey(publicKey);
        setKeyPair(privateKey, publicKey);
      } catch (error) {
        console.error('Error al generar las claves RSA: ', error);
      }
    }
  };

  useEffect(() => {
    generateKeys();
  }, []);

  return <RSAKeyPairContext.Provider value={{ privateKey, publicKey }}>{children}</RSAKeyPairContext.Provider>;
};
