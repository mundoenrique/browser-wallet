'use client';

import NodeRSA from 'node-rsa';
import React, { useEffect } from 'react';
//Internal app
import { setprivateKeys } from '@/utils/api';
import { ChildrenProps } from '@/interfaces';
import { useKeyStore } from '@/store/keyStore';
import { removePEMHeadersAndFooters } from '@/utils/jwt';

export const KeyProvider: React.FC<ChildrenProps> = ({ children }) => {
  const { jwePublicKey, jwePrivateKey, jwsPublicKey, jwsPrivateKey, setKeys } = useKeyStore();

  useEffect(() => {
    if (!jwePublicKey || !jwePrivateKey || !jwsPublicKey || !jwsPrivateKey) {
      (function () {
        try {
          /**
           * Generating RSA key pairs.
           */
          const jweKeypair = new NodeRSA({ b: 2048 });
          const jwePrivateKey = removePEMHeadersAndFooters(jweKeypair.exportKey('pkcs8-private-pem'));
          const jwePublicKey = removePEMHeadersAndFooters(jweKeypair.exportKey('pkcs8-public-pem'));

          const jwsKeypair = new NodeRSA({ b: 2048 });
          const jwsPrivateKey = removePEMHeadersAndFooters(jwsKeypair.exportKey('pkcs8-private-pem'));
          const jwsPublicKey = removePEMHeadersAndFooters(jwsKeypair.exportKey('pkcs8-public-pem'));

          setKeys({ jwePublicKey, jwePrivateKey, jwsPublicKey, jwsPrivateKey });
          setprivateKeys(jwePrivateKey, jwsPrivateKey);
        } catch (error) {
          console.error('Error getting keys:', error);
        }
      })();
    }
  }, [jwePrivateKey, jwePublicKey, jwsPrivateKey, jwsPublicKey, setKeys]);

  return <>{children}</>;
};
