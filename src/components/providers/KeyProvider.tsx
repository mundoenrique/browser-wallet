'use client';

import NodeRSA from 'node-rsa';
import { useEffect } from 'react';
// Internal app
import { api } from '@/utils';
import LogoGreen from '%/images/LogoGreen';
import { ChildrenProps } from '@/interfaces';
import PurpleLayout from '../layout/PurpleLayout';
import { useJwtStore, useKeyStore } from '@/store';
import { removePEMHeadersAndFooters } from '@/utils/jwt';

export default function KeyProvider({ children }: ChildrenProps): JSX.Element {
  const token = useJwtStore((state) => state.token);
  const setKeys = useKeyStore((state) => state.setKeys);
  const setToken = useJwtStore((state) => state.setToken);
  const activeKeys = useKeyStore((state) => state.activeKeys);
  const jwePublicKey = useKeyStore((state) => state.jwePublicKey);
  const jwsPublicKey = useKeyStore((state) => state.jwsPublicKey);

  useEffect(() => {
    if (!activeKeys) {
      const jweKeypair = new NodeRSA({ b: 2048 });
      const jwePrivateKey = removePEMHeadersAndFooters(jweKeypair.exportKey('pkcs8-private-pem'));
      const jwePublicKey = removePEMHeadersAndFooters(jweKeypair.exportKey('pkcs8-public-pem'));

      const jwsKeypair = new NodeRSA({ b: 2048 });
      const jwsPrivateKey = removePEMHeadersAndFooters(jwsKeypair.exportKey('pkcs8-private-pem'));
      const jwsPublicKey = removePEMHeadersAndFooters(jwsKeypair.exportKey('pkcs8-public-pem'));

      setKeys({ jwePublicKey, jwePrivateKey, jwsPublicKey, jwsPrivateKey });
    }
  }, [activeKeys, setKeys]);

  useEffect(() => {
    if (!token && activeKeys) {
      (async () => {
        try {
          const response = await api.post('/gettoken', { jwePublicKey, jwsPublicKey });
          const token = (await response.data.data) as string;
          setToken(token);
        } catch (error) {
          console.error('Error generating JWT token:', error);
        }
      })();
    }
  }, [activeKeys, jwePublicKey, jwsPublicKey, setToken, token]);

  if (!token) {
    return (
      <PurpleLayout>
        <LogoGreen />
      </PurpleLayout>
    );
  }

  return <>{children}</>;
}
