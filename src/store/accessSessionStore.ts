import { type StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { redisStorage } from './storages/accessSession.store';

const storeAPi: StateCreator<any, [['zustand/devtools', never]]> = (set) => ({

  accessSession: false,
  setAccessSession: (value: boolean) => set({ accessSession: value }),
});

export const useAccessSessionStore = create<any>()(
  devtools(
    persist(storeAPi, {
      name: 'access-storage',
      storage: redisStorage,
    })
  )
);
