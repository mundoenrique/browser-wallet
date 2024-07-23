import { type StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
//Internal app
import { JwtStoreProps } from '@/interfaces/store';
import { redisStorage } from '@/store/storages/jwt.store';

const storeAPi: StateCreator<JwtStoreProps, [['zustand/devtools', never]]> = (set) => ({
  token: null,
  uuid: null,

  setUuid: (uuid) => set({ uuid }),
  setToken: (token) => set({ token }),
});

export const useJwtStore = create<JwtStoreProps>()(
  devtools(
    persist(storeAPi, {
      name: 'jwt-storage',
      storage: redisStorage,
    })
  )
);
