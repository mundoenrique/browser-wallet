import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
//Internal app
import { SessionStoreProps } from '@/interfaces';

export const useSessionStore = create<SessionStoreProps>()(
  devtools(
    persist(
      (set) => ({
        /**
         * Current uuid
         */
        uuid: null,
        /**
         * Replaces the current uuid
         */
        setUuid: (uuid) => set({ uuid }),
      }),
      {
        name: 'session-store',
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
