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
        jwePublicKey: null,
        jwePrivateKey: null,
        jwsPublicKey: null,
        jwsPrivateKey: null,
        activeKeys: false,

        setKeys: ({ jwePublicKey, jwePrivateKey, jwsPublicKey, jwsPrivateKey }) =>
          set({ jwePublicKey, jwePrivateKey, jwsPublicKey, jwsPrivateKey, activeKeys: true }),
      }),
      {
        name: 'key-store',
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
