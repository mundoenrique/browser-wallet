import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
//Internal app
import { MenuStore } from '@/interfaces';

/**
 * Store for navMenu
 * @param currentItem - Initial state {@defaultValue `home`}
 * @param setCurrentItem - Function that sets the new value
 *
 * @remarks This state persists in localstorage
 */
export const useMenuStore = create<MenuStore>()(
  persist(
    (set) => ({
      /**
       * Current menu item
       */
      currentItem: 'home',
      /**
       *Replaces the current menu item
       */
      setCurrentItem: (item) => set({ currentItem: item }),
    }),
    { name: 'Menu', storage: createJSONStorage(() => sessionStorage) }
  )
);
