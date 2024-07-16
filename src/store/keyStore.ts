import { type StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
//Internal app
import { KeyStoreProps } from '@/interfaces/store';
import { redisStorage } from '@/store/storages/keys.store';

const storeAPi: StateCreator<KeyStoreProps, [['zustand/devtools', never]]> = (set) => ({
  jwePublicKey: null,
  jwePrivateKey: null,
  jwsPublicKey: null,
  jwsPrivateKey: null,

  setKeys: ({ jwePublicKey, jwePrivateKey, jwsPublicKey, jwsPrivateKey }) =>
    set({ jwePublicKey, jwePrivateKey, jwsPublicKey, jwsPrivateKey }),
});

/**
 * store keys JWS-JWE
 *
 * @param jwePublicKey - Initial state {@defaultValue `null`}
 * @param jwePrivateKey - Initial state {@defaultValue `null`}
 * @param jwsPublicKey - Initial state {@defaultValue `null`}
 * @param jwsPrivateKey - Initial state {@defaultValue `null`}
 * @param setKeys - Function that sets the new keys
 */
export const useKeyStore = create<KeyStoreProps>()(
  devtools(
    persist(storeAPi, {
      name: 'keyRedis-storage',
      storage: redisStorage,
    })
  )
);
