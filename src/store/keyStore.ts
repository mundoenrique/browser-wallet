import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
//Internal app
import { KeyStoreProps } from '@/interfaces';

/**
 * Store the public and private key
 *
 * @param publicKey - Initial state {@defaultValue `null`}
 * @param privateKey - Initial state {@defaultValue `null`}
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
        publicKey: null,
        /**
         * Current private key
         */
        privateKey: null,
        /**
         * Set value for public and private key
         */
        setKeys: (keys) => set({ publicKey: keys.publicKey, privateKey: keys.privateKey }),
      }),
      {
        name: 'key-store',
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
