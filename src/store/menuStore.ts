import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useMenuStore = create()(
  persist(
    (set) => ({
      currentItem: 'home',
      setCurrentItem: (item: number) => set({ currentItem: item }),
    }),
    {
      name: 'Menu',
      version: undefined,
    }
  )
);
