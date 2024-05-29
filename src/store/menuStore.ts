import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
//Internal app
import { MenuStore } from '@/interfaces';

/**
 * Store for navMenu
 *
 * @param currentItem - Initial state {@defaultValue `home`}
 * @param setCurrentItem - Function that sets the new value
 *
 * @remarks This state persists in sessionStorage
 */
export const useMenuStore = create<MenuStore>()(
  persist(
    (set) => ({
      currentItem: 'home',

      setCurrentItem: (item) => set({ currentItem: item }),
    }),
    { name: 'menu-store', storage: createJSONStorage(() => sessionStorage) }
  )
);
