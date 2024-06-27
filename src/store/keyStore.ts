import { type StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { useWeddingBoundStore } from './wedding';
import { redisStorage } from '@/store/storages/redis.store';
import { KeyStoreProps } from '@/interfaces/store';


const storeAPi: StateCreator<KeyStoreProps, [['zustand/devtools', never]]> = (set) => ({
  jwePublicKey: null,
  jwePrivateKey: null,
  jwsPublicKey: null,
  jwsPrivateKey: null,

  setKeys: ({ jwePublicKey, jwePrivateKey, jwsPublicKey, jwsPrivateKey }) =>
  set({ jwePublicKey, jwePrivateKey, jwsPublicKey, jwsPrivateKey })
});

export const useKeyStore = create<KeyStoreProps>()(
  devtools(
    persist(storeAPi, {
      name: 'keyRedis-storage',
      storage: redisStorage,
    })
  )
);