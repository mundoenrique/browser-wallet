import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
//Internal app
import { SessionStoreProps } from '@/interfaces';

/**
 * Store and change user uuid
 */
export const useSessionStore = create<SessionStoreProps>()(
  devtools(
    persist(
      (set) => ({
        uuid: null,

        setUuid: (uuid) => set({ uuid }),
      }),
      {
        name: 'session-store',
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
