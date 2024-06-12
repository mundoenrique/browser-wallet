import { type StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { useWeddingBoundStore } from './wedding';
import { redisStorage } from '@/store/storages/redis.store';
import { JwtStoreProps } from '@/interfaces/store';


const storeAPi: StateCreator<JwtStoreProps, [['zustand/devtools', never]]> = (set) => ({
  token: null,

  setToken: (token) => set({ token })
});

export const useJwtStore = create<JwtStoreProps>()(
  devtools(
    persist(storeAPi, {
      name: 'jwt-storage',
      storage: redisStorage,
    })
  )
);

useJwtStore.subscribe((nextState /*prevState*/) => {
  const { token } = nextState;

  useWeddingBoundStore.getState().setToken(token);
});