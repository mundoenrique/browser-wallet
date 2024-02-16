import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MenuStore } from '@/interfaces';

/**
 * Store for navMenu
 */

export const useMenuStore = create<MenuStore>()(
  persist(
    (set) => ({
      currentItem: 'home',
      setCurrentItem: (item) => set({ currentItem: item }),
    }),
    {
      name: 'Menu',
      version: undefined,
    }
  )
);
