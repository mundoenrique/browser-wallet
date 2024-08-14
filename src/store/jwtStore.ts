import { type StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
//Internal app
import { JwtStoreProps } from '@/interfaces/store';
import { redisStorage } from '@/store/storages/jwt.store';

const storeAPi: StateCreator<JwtStoreProps, [['zustand/devtools', never]]> = (set) => ({
  token: null,
  uuid: null,
  exchange: null,

  setToken: (token) => set({ token }),
  setDataToken: ({token, uuid, exchange}) => set({token, uuid, exchange}),

});

export const useJwtStore = create<JwtStoreProps>()(
  devtools(
    persist(storeAPi, {
      name: 'jwt-storage',
      storage: redisStorage,
    })
  )
);
