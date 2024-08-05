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
import { decryptForge, fastModularExponentiation, generateAesKey, generatePublicKey } from '@/utils/toolHelper';

export default function KeyProvider({ children }: ChildrenProps): JSX.Element {
  const pathname = usePathname();

  const [keys, setKeysStore] = useState<any>('');
  const [time, setTime] = useState<boolean>(true);

  const setKeys = useKeyStore((state) => state.setKeys);

  const setDataToken = useJwtStore((state) => state.setDataToken);

  const activeApp = useActiveAppStore((state) => state.activeApp);

  const initAccess = useActiveAppStore((state) => state.initAccess);

  const setActiveApp = useActiveAppStore((state) => state.setActiveApp);

  const setinitAccess = useActiveAppStore((state) => state.setinitAccess);

  const setCreateAccess = useActiveAppStore((state) => state.setCreateAccess);

  const setAccessSession = useAccessSessionStore((state) => state.setAccessSession);

  const token = useJwtStore((state) => state.token);

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
    } else {
      setTimeout(() => { setTime(false); }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeApp, time, setTimeout, setActiveApp, setCreateAccess]);

  useEffect(() => {
    if (!initAccess && activeApp) {
      (async () => {
        try {
          const idDevice = window.navigation.activation.entry.key;
          const keysAes = generatePublicKey()
          const { jwePublicKey, jwsPublicKey } = keys as { jwePublicKey: string; jwsPublicKey: string };
          const response = await api.post('/gettoken', {
            jwePublicKey,
            jwsPublicKey,
            isBrowser,
            idDevice,
            exchange: keysAes.keyPublic
          });
          const token = (await response.data.data.jwt) as string;
          const uuid = (await response.data.data.sessionId) as string;
          const publicKey = (await response.data.data.exchange) as number;
          const primeNumber = parseInt(process.env.NEXT_PUBLIC_PRIME_NUMBER || '0');
          const exchange = fastModularExponentiation(publicKey, keysAes.keyPrivate, primeNumber);
          const exchangeKey = generateAesKey(exchange)
          setKeys(keys);
          setDataToken({token, uuid, exchange: exchangeKey.toString()});
          setCreateAccess('');
          setinitAccess(true);
          setAccessSession(false);
        } catch (error) {
          console.error('Error generating JWT token:', error);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initAccess, activeApp, keys, setDataToken, setKeys, setinitAccess, setCreateAccess, setAccessSession]);

  if (time || (!initAccess && !token && pathname != '/signout')) {

    return (
      <PurpleLayout>
        <LogoGreen />
      </PurpleLayout>
    );
  }

  return <>{ children }</>;

}
