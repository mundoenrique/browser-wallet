import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

/**
 * Stores the url of the parent application
 *
 * @param backLink - Url parent app {@defaultValue `''`}
 * @param setBackLink - Function to change url
 */
export const backLinkStore = create<any>()(
  devtools(
    persist(
      (set) => ({
        backLink: '',
        setBackLink: (status: any) => set({ backLink: status }),
      }),
      {
        name: 'back-store',
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
