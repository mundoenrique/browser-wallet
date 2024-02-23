import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { oAuth2StoreProps } from '@/interfaces/store';

export const useOAuth2Store = create<oAuth2StoreProps>()(
  devtools(
    persist(
      (set) => ({
        accessToken: null,
        setAccessToken: (accessToken) => set({ accessToken }),
      }),
      {
        name: 'oauth2-store',
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
