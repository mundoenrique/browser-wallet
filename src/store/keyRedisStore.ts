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
  activeKeys: false,

  setKeys: ({ jwePublicKey, jwePrivateKey, jwsPublicKey, jwsPrivateKey }) =>
  set({ jwePublicKey, jwePrivateKey, jwsPublicKey, jwsPrivateKey, activeKeys: true })
});

export const useKeyRedisStore = create<KeyStoreProps>()(
  devtools(
    persist(storeAPi, {
      name: 'keyRedis-storage',
      storage: redisStorage,
    })
  )
);

useKeyRedisStore.subscribe((nextState /*prevState*/) => {
  const { jwePublicKey, jwePrivateKey, jwsPublicKey, jwsPrivateKey } = nextState;

  useWeddingBoundStore.getState().setKeys(jwePublicKey, jwePrivateKey, jwsPublicKey, jwsPrivateKey);
});