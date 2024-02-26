import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
//Internal app
import { JwtStoreProps } from '@/interfaces/store';

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
