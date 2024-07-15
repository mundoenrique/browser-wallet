import { type StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { redisStorage } from '@/store/storages/jwt.store';
import { JwtStoreProps } from '@/interfaces/store';

const storeAPi: StateCreator<JwtStoreProps, [['zustand/devtools', never]]> = (set) => ({

  token: null,

  setToken: (value:string | null) => set({ token:value })
});

export const useJwtStore = create<JwtStoreProps>()(
  devtools(
    persist(storeAPi, {
      name: 'jwt-storage',
      storage: redisStorage,
    })
  )
);