import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
//Internal app
import { DebtStore, IPayOffDebt, IPayOffDebtError } from '@/interfaces';

export const useDebStore = create<DebtStore>()(
  persist(
    (set) => ({
      debt: null,
      payOffDebt: null,
      view: 'DEBT',
      error: null,
      setDebt: (data) => set({ debt: data }),
      setView: (value) => set({ view: value }),
      setPayOffDebt: (data: IPayOffDebt) => set({ payOffDebt: data }),
      setError: (data: IPayOffDebtError) => set({ error: data }),
    }),
    { name: 'debt-store', storage: createJSONStorage(() => sessionStorage) }
  )
);
