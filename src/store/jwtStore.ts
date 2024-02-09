// src/store/jwtStore.ts

import { JwtStoreProps } from '@/interfaces/store';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

export const useJwtStore = create<JwtStoreProps>()(
  devtools(
    persist(
      (set) => ({
        token: null,
        setToken: (token) => set({ token }),
      }),
      {
        name: 'jwt-store',
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
