'use client';

import NodeRSA from 'node-rsa';
import { useEffect, useState } from 'react';
import { isBrowser } from 'react-device-detect';

// Internal app
import { api } from '@/utils/api';
import LogoGreen from '%/images/LogoGreen';
import { ChildrenProps } from '@/interfaces';
import { useKeyStore, useJwtStore } from '@/store';
import { useKeyRedisStore } from '@/store/keyRedisStore';
import PurpleLayout from '../layout/PurpleLayout';
import { removePEMHeadersAndFooters } from '@/utils/jwt';

export default function KeyProvider({ children }: ChildrenProps): JSX.Element {
	const [keys, setKeysStore] = useState<any>(null);
  const setKeys = useKeyStore((state) => state.setKeys);
  const token = useJwtStore((state) => state.token);
  const setToken = useJwtStore((state) => state.setToken);
  const setRedisKeys = useKeyRedisStore((state) => state.setKeys);

  useEffect(() => {
    if (keys === null) {
      const jweKeypair = new NodeRSA({ b: 2048 });
      const jwePrivateKey = removePEMHeadersAndFooters(jweKeypair.exportKey('pkcs8-private-pem'));
      const jwePublicKey = removePEMHeadersAndFooters(jweKeypair.exportKey('pkcs8-public-pem'));
      const jwsKeypair = new NodeRSA({ b: 2048 });
      const jwsPrivateKey = removePEMHeadersAndFooters(jwsKeypair.exportKey('pkcs8-private-pem'));
      const jwsPublicKey = removePEMHeadersAndFooters(jwsKeypair.exportKey('pkcs8-public-pem'));
      setKeysStore({ jwePublicKey, jwePrivateKey, jwsPublicKey, jwsPrivateKey })
      setKeys({ jwePublicKey, jwePrivateKey, jwsPublicKey, jwsPrivateKey });
    }
  }, [keys, setKeys]);

  useEffect(() => {
    if (!token && keys != null) {
      (async () => {
        try {
          const { jwePublicKey, jwsPublicKey } = keys as {jwePublicKey:string, jwsPublicKey:string}
          const response = await api.post('/gettoken', { jwePublicKey, jwsPublicKey, isBrowser });
          const token = (await response.data.data.jwt) as string;
          await setToken(token);
          await setRedisKeys(keys)
        } catch (error) {
          console.error('Error generating JWT token:', error);
        }
      })();
    }
  }, [setToken, setRedisKeys, keys, token]);

  if (!token) {
    return (
      <PurpleLayout>
        <LogoGreen />
      </PurpleLayout>
    );
  }

  return <>{children}</>;
}
