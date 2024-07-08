import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
//Internal app
import { HeadersStore } from '@/interfaces';

/**
 * Stores the url of the parent application
 *
 * @param backLink - Url parent app {@defaultValue `''`}
 * @param setBackLink - Function to change url
 * @param host - host app {@defaultValue `''`}
 * @param setHost - Function to change host
 *
 */
export const useHeadersStore = create<HeadersStore>()(
  devtools(
    persist(
      (set) => ({
        backLink: '',
        setBackLink: (status: any) => set({ backLink: status }),
        host: '',
        setHost: (status: any) => set({ host: status }),
      }),
      {
        name: 'back-store',
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
