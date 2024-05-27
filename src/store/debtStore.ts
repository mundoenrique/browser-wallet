import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
//Internal app
import { DebtStore } from '@/interfaces';

export const useDebStore = create<DebtStore>()(
  persist(
    (set) => ({
      debt: null,
      view: 'DEBT',
      setDebt: (data) => set({ debt: data }),
      setView: (value) => set({ view: value }),
    }),
    { name: 'debtStore', storage: createJSONStorage(() => sessionStorage) }
  )
);
