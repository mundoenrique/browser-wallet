import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
//Internal app
import { JwtStoreProps } from '@/interfaces/store';

/**
 * Store for JWT
 *
 * @param token - Initial state {@defaultValue `null`}
 * @param setToken - Function that sets the new value
 *
 * @remarks This state persists in sessionStorage
 */
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
