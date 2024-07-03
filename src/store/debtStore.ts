import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
//Internal app
import { DebtStore, IBalance, IDebt, IPayOffDebtError } from '@/interfaces';

export const useDebStore = create<DebtStore>()(
  persist(
    (set) => ({
      debt: null,
      payOffDebt: null,
      view: 'DEBT',
      error: null,
      balance: null,
      setDebt: (data) => set({ debt: data }),
      setView: (value) => set({ view: value }),
      setPayOffDebt: (data: IDebt) => set({ payOffDebt: data }),
      setError: (data: IPayOffDebtError) => set({ error: data }),
      setBalance: (data: IBalance) => set({ balance: data }),
    }),
    { name: 'debt-store', storage: createJSONStorage(() => sessionStorage) }
  )
);
