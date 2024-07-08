import { StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { redisStorage } from '@/store/storages/redis.store';

//Internal app
import { DebtStore, IBalance, IDebt, IPayOffDebtError } from '@/interfaces';

const storeAPi: StateCreator<DebtStore, [['zustand/devtools', never]]> = (set) => ({
  debt: null,
  payOffDebt: null,
  view: 'DEBT',
  error: null,
  balance: null,
  setDebt: (data) => set({ debt: data }),
  setView: (value) => set({ view: value }),
  setPayOffDebt: (data: IDebt) => set({ payOffDebt: data }),
  setError: (data: IPayOffDebtError) => set({ error: data }),
  setBalance: (data: IBalance) => set({ balance: data })
});

export const useDebStore = create<DebtStore>()(
  devtools(
    persist(storeAPi, {
      name: 'deb-storage',
      storage: redisStorage,
    })
  )
);