import { type StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
//Internal app
import { redisStorage } from './storages/accessSession.store';

const storeAPi: StateCreator<any, [['zustand/devtools', never]]> = (set) => ({
  accessSession: false,
  setAccessSession: (value: boolean) => set({ accessSession: value }),
});

/**
 * Store session
 *
 * @param accessSession - Initial state {@defaultValue `false`}
 * @param setAccessSession - Handle new session
 *
 * @remarks This state persists in redisStorage
 */
export const useAccessSessionStore = create<any>()(
  devtools(
    persist(storeAPi, {
      name: 'access-storage',
      storage: redisStorage,
    })
  )
);
