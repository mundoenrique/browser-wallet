import { type StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
//Internal app
import { JwtStoreProps } from '@/interfaces/store';
import { redisStorage } from '@/store/storages/jwt.store';

const storeAPi: StateCreator<JwtStoreProps, [['zustand/devtools', never]]> = (set) => ({
  token: null,

  setToken: (value: string | null) => set({ token: value }),
});

export const useJwtStore = create<JwtStoreProps>()(
  devtools(
    persist(storeAPi, {
      name: 'jwt-storage',
      storage: redisStorage,
    })
  )
);
