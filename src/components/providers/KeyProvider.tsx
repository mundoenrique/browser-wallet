'use client';

import NodeRSA from 'node-rsa';
//Internal app
import { useJwtStore } from '@/store';
import { useApi } from '@/hooks/useApi';
import { setprivateKeys } from '@/utils/api';
import { ChildrenProps } from '@/interfaces';
import { useKeyStore } from '@/store/keyStore';
import { removePEMHeadersAndFooters } from '@/utils/jwt';

export default function KeyProvider({ children }: ChildrenProps): JSX.Element {
  const { jwePublicKey, jwePrivateKey, jwsPublicKey, jwsPrivateKey, setKeys } = useKeyStore();
  const { token, setToken } = useJwtStore();
  const { setSessionId } = useJwtStore();
  const api = useApi();

  if (!jwePublicKey || !jwePrivateKey || !jwsPublicKey || !jwsPrivateKey) {
    try {
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
  } else {
    setprivateKeys(jwePrivateKey, jwsPrivateKey);
  }

  /* if (!token && jwePublicKey && jwsPublicKey) {
    (async () => {
      try {
        const response = await api.post('/gettoken', { jwePublicKey, jwsPublicKey });
        const token = (await response.data.data.jwt) as string;
        const sessionId = (await response.data.data.sessionId) as string;
        setToken(token);
        setSessionId(sessionId);
      } catch (error) {
        console.error('Error generating JWT token:', error);
      }
    })();
  } */

  return <>{children}</>;
}
