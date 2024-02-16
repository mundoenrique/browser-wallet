'use client';

import React, { useEffect } from 'react';
import NodeRSA from 'node-rsa';
import { useKeyStore } from '@/store/keyStore';
import { setprivateKey } from '@/utils/api';
import { removePEMHeadersAndFooters } from '@/utils/jwt';
import { ChildrenProps } from '@/interfaces/constant';

export const KeyProvider: React.FC<ChildrenProps> = ({ children }) => {
  const { publicKey, privateKey, setKeys } = useKeyStore();

  useEffect(() => {
    if (!publicKey || !privateKey) {
      const generateKeys = () => {
        try {
          console.log('Generando par de claves RSA...');
          const keypair = new NodeRSA({ b: 2048 });
          const privateKey = removePEMHeadersAndFooters(keypair.exportKey('pkcs8-private-pem'));
          const publicKey = removePEMHeadersAndFooters(keypair.exportKey('pkcs8-public-pem'));
          console.log('Clave pública:', publicKey);
          console.log('Clave privada:', privateKey);
          setKeys({ publicKey, privateKey });
          setprivateKey(privateKey);
        } catch (error) {
          console.error('Error al obtener las claves:', error);
        }
      };

      generateKeys();
    }
  }, [privateKey, publicKey, setKeys]);

  return <>{children}</>;
};
