'use client';

import NodeRSA from 'node-rsa';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { isBrowser } from 'react-device-detect';
// Internal app
import { api } from '@/utils/api';
import LogoGreen from '%/images/LogoGreen';
import { ChildrenProps } from '@/interfaces';
import PurpleLayout from '../layout/PurpleLayout';
import { removePEMHeadersAndFooters } from '@/utils/jwt';
import { useJwtStore, useKeyStore, useActiveAppStore, useAccessSessionStore } from '@/store';

export default function KeyProvider({ children }: ChildrenProps): JSX.Element {
  const pathname = usePathname();

  const [keys, setKeysStore] = useState<any>('');

  const setKeys = useKeyStore((state) => state.setKeys);

  const setToken = useJwtStore((state) => state.setToken);

  const setUuid = useJwtStore((state) => state.setUuid);

  const activeApp = useActiveAppStore((state) => state.activeApp);

  const initAccess = useActiveAppStore((state) => state.initAccess);

  const setActiveApp = useActiveAppStore((state) => state.setActiveApp);

  const setinitAccess = useActiveAppStore((state) => state.setinitAccess);

  const setCreateAccess = useActiveAppStore((state) => state.setCreateAccess);

  const setAccessSession = useAccessSessionStore((state) => state.setAccessSession);

  useEffect(() => {
    if (!activeApp && pathname != '/signout') {
      const jweKeypair = new NodeRSA({ b: 2048 });
      const jwePrivateKey = removePEMHeadersAndFooters(jweKeypair.exportKey('pkcs8-private-pem'));
      const jwePublicKey = removePEMHeadersAndFooters(jweKeypair.exportKey('pkcs8-public-pem'));
      const jwsKeypair = new NodeRSA({ b: 2048 });
      const jwsPrivateKey = removePEMHeadersAndFooters(jwsKeypair.exportKey('pkcs8-private-pem'));
      const jwsPublicKey = removePEMHeadersAndFooters(jwsKeypair.exportKey('pkcs8-public-pem'));
      setKeysStore({ jwePublicKey, jwePrivateKey, jwsPublicKey, jwsPrivateKey });
      setCreateAccess(jwePrivateKey);
      setActiveApp(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeApp, setActiveApp, setCreateAccess]);

  useEffect(() => {
    if (!initAccess && activeApp) {
      (async () => {
        try {
          const idDevice = window.navigation.activation.entry.key;
          const { jwePublicKey, jwsPublicKey } = keys as { jwePublicKey: string; jwsPublicKey: string };
          const response = await api.post('/gettoken', { jwePublicKey, jwsPublicKey, isBrowser, idDevice });
          const token = (await response.data.data.jwt) as string;
          const uuid = (await response.data.data.sessionId) as string;
          setKeys(keys);
          setToken(token);
          setUuid(uuid);
          setCreateAccess('');
          setinitAccess(true);
          setAccessSession(false);
        } catch (error) {
          console.error('Error generating JWT token:', error);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initAccess, activeApp, keys, setToken, setKeys, setinitAccess, setCreateAccess, setAccessSession]);

  if (!initAccess && pathname != '/signout') {
    return (
      <PurpleLayout>
        <LogoGreen />
      </PurpleLayout>
    );
  }

  return <>{children}</>;
}
