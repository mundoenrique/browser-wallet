'use client';

import NodeRSA from 'node-rsa';
//Internal app
import { setprivateKeys } from '@/utils/api';
import { ChildrenProps } from '@/interfaces';
import { useKeyStore } from '@/store/keyStore';
import { removePEMHeadersAndFooters } from '@/utils/jwt';

export default function KeyProvider({ children }: ChildrenProps): JSX.Element {
  const { jwePublicKey, jwePrivateKey, jwsPublicKey, jwsPrivateKey, setKeys } = useKeyStore();

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
        throw new Error('Error getting keys:', error as Error).message;
      }
    })();
  } else {
    setprivateKeys(jwePrivateKey, jwsPrivateKey);
  }

  return <>{children}</>;
}
