'use client';

import NodeRSA from 'node-rsa';
import React, { useEffect } from 'react';
//Internal app
import { setprivateKey } from '@/utils/api';
import { ChildrenProps } from '@/interfaces';
import { useKeyStore } from '@/store/keyStore';
import { removePEMHeadersAndFooters } from '@/utils/jwt';

export const KeyProvider: React.FC<ChildrenProps> = ({ children }) => {
  const { publicKey, privateKey, setKeys } = useKeyStore();

  useEffect(() => {
    if (!publicKey || !privateKey) {
      const generateKeys = () => {
        try {
          /**
           * Generating RSA key pair.
           */
          const keypair = new NodeRSA({ b: 2048 });
          const privateKey = removePEMHeadersAndFooters(keypair.exportKey('pkcs8-private-pem'));
          const publicKey = removePEMHeadersAndFooters(keypair.exportKey('pkcs8-public-pem'));
          setKeys({ publicKey, privateKey });
          setprivateKey(privateKey);
        } catch (error) {
          console.error('Error getting keys:', error);
        }
      };
      generateKeys();
    }
  }, [privateKey, publicKey, setKeys]);

  return <>{children}</>;
};
