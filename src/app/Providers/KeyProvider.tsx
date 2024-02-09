// src/app/Providers/KeyProvider.tsx
'use client';

import React, { useEffect } from 'react';
import { useKeyStore } from '@/store/keyStore';
import { useApi } from '@/hooks/useApi';
import { setKeyPair } from '@/utils/api';
import { ChildrenProps } from '@/interfaces/constant';
import { JSEncrypt } from 'jsencrypt';

export const KeyProvider: React.FC<ChildrenProps> = ({ children }) => {
  const { publicKey, privateKey, setKeys } = useKeyStore();
  const api = useApi();

  useEffect(() => {
    if (!publicKey || !privateKey) {
      // const generateKeys = () => {
      //   try {
      //     console.log('Generando par de claves RSA...');
      //     // Crea una instancia de JSEncrypt
      //     const crypt = new JSEncrypt({ default_key_size: '2048' });

      //     // Genera el par de claves
      //     const publicK = crypt.getPublicKey();
      //     const privateK = crypt.getPrivateKey();
      //     console.log('Clave pública:', publicK);
      //     console.log('Clave privada:', privateK);

      //     setKeys({ publicKey: publicK, privateKey: privateK });
      //     setKeyPair(privateK, publicK);
      //   } catch (error) {
      //     console.error('Error al obtener las claves:', error);
      //   }
      // };
      const fetchKeys = async () => {
        try {
          console.log('Generando par de claves RSA...');
          const response = await api.get('/auth/generate-keys');
          const { publicKey, privateKey } = response.data;

          setKeys({ publicKey, privateKey });
          setKeyPair(privateKey, publicKey);
        } catch (error) {
          console.error('Error al obtener las claves:', error);
        }
      };

      fetchKeys();
      // generateKeys();
    }
  }, []);

  return <>{children}</>;
};
