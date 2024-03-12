import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
//Internal app
import { KeyStoreProps } from '@/interfaces';

/**
 * Store the public and private key
 *
 * @param jwePublicKey - Initial state {@defaultValue `null`}
 * @param jwePrivateKey - Initial state {@defaultValue `null`}
 * @param jwsPublicKey - Initial state {@defaultValue `null`}
 * @param jwsPrivateKey - Initial state {@defaultValue `null`}
 * @param setKeys - Function that sets the new value
 *
 * @remarks This state persists in sessionStorage
 */
export const useKeyStore = create<KeyStoreProps>()(
  devtools(
    persist(
      (set) => ({
        /**
         * Current public key
         */
        jwePublicKey: null,
        /**
         * Current private key
         */
        jwePrivateKey: null,
        /**
         * Current public key
         */
        jwsPublicKey: null,
        /**
         * Current private key
         */
        jwsPrivateKey: null,
        /**
         * Set value for public and private key
         */
        setKeys: (keys) => set({ jwePublicKey: keys.jwePublicKey, jwePrivateKey: keys.jwePrivateKey, jwsPublicKey: keys.jwsPublicKey, jwsPrivateKey: keys.jwsPrivateKey  }),
      }),
      {
        name: 'key-store',
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
