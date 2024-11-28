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
import { fastModularExponentiation, generateAesKey, generatePublicKey } from '@/utils/toolHelper';
import uuid4 from 'uuid4';
import { Typography } from '@mui/material';

export default function KeyProvider({ children }: Readonly<ChildrenProps>): JSX.Element {
  const pathname = usePathname();

  const [keys, setKeys] = useState<any>('');

  const [time, setTime] = useState<boolean>(true);

  const setKeysStore = useKeyStore((state) => state.setKeys);

  const setDataToken = useJwtStore((state) => state.setDataToken);

  const activeApp = useActiveAppStore((state) => state.activeApp);

  const initAccess = useActiveAppStore((state) => state.initAccess);

  const setActiveApp = useActiveAppStore((state) => state.setActiveApp);

  const setInitAccess = useActiveAppStore((state) => state.setInitAccess);

  const setCreateAccess = useActiveAppStore((state) => state.setCreateAccess);

  const setAccessSession = useAccessSessionStore((state) => state.setAccessSession);

  const token = useJwtStore((state) => state.token);

  useEffect(() => {
    if (
      !activeApp &&
      pathname != '/signout' &&
      pathname != '/policies' &&
      pathname != '/legal' &&
      pathname != '/conditions'
    ) {
      const jweKeypair = new NodeRSA({ b: 2048 });
      const jwePrivateKey = removePEMHeadersAndFooters(jweKeypair.exportKey('pkcs8-private-pem'));
      const jwePublicKey = removePEMHeadersAndFooters(jweKeypair.exportKey('pkcs8-public-pem'));
      const jwsKeypair = new NodeRSA({ b: 2048 });
      const jwsPrivateKey = removePEMHeadersAndFooters(jwsKeypair.exportKey('pkcs8-private-pem'));
      const jwsPublicKey = removePEMHeadersAndFooters(jwsKeypair.exportKey('pkcs8-public-pem'));
      setKeys({ jwePublicKey, jwePrivateKey, jwsPublicKey, jwsPrivateKey });
      setCreateAccess(jwePrivateKey);
      setActiveApp(true);
    } else {
      setTimeout(() => {
        setTime(false);
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeApp, time, setTimeout, setActiveApp, setCreateAccess]);

  useEffect(() => {
    if (!initAccess && !token && activeApp) {
      (async () => {
        try {
          window.name = uuid4();
          const idDevice = window.name;
          const keysAes = generatePublicKey();
          const { jwePublicKey, jwsPublicKey } = keys as { jwePublicKey: string; jwsPublicKey: string };
          const response = await api.post('/gettoken', {
            jwePublicKey,
            jwsPublicKey,
            isBrowser,
            idDevice,
            exchange: keysAes.keyPublic,
          });
          const token = (await response.data.data.jwt) as string;
          const uuid = (await response.data.data.sessionId) as string;
          const publicKey = (await response.data.data.exchange) as number;
          const primeNumber = parseInt(process.env.NEXT_PUBLIC_PRIME_NUMBER ?? '0');
          const exchange = fastModularExponentiation(publicKey, keysAes.keyPrivate, primeNumber);
          const exchangeKey = generateAesKey(exchange);
          setKeysStore(keys);
          setDataToken({ token, uuid, exchange: exchangeKey.toString() });
          setCreateAccess('');
          setInitAccess(true);
          setAccessSession(false);
          setInitAccess(true);
        } catch (error) {
          console.error('Error generating JWT token:', error);
        }
      })();
    }

    token && setCreateAccess('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initAccess, activeApp, keys, setDataToken, setKeysStore, setCreateAccess, setAccessSession]);

  if (
    time ||
    (!initAccess &&
      !token &&
      pathname != '/signout' &&
      pathname != '/policies' &&
      pathname != '/legal' &&
      pathname != '/conditions')
  ) {
    return (
      <PurpleLayout>
        <LogoGreen />
      </PurpleLayout>
    );
  }

  return (
    <>
      {children}
      <Typography sx={{ position: 'fixed', bottom: '10px', right: '10px' }} variant="caption">
        v1.0.11
      </Typography>
    </>
  );
}
