import { type StateCreator, create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { redisStorage } from '@/store/storages/charge.store';
//Internal app
import { ChargeStore } from '@/interfaces';

/**
 * Store charge amount
 *
 * @param chargeAmount - Initial state {@defaultValue `0`}
 * @param setCharge - Function that sets the new value
 */
const storeAPi: StateCreator<ChargeStore, [['zustand/devtools', never]]> = (set) => ({

  chargeAmount: 0,
  setCharge: (data: number) => set(() => ({ chargeAmount: data })),
});

export const useChargeStore = create<ChargeStore>()(
  devtools(
    persist(storeAPi, {
      name: 'charge-storage',
      storage: redisStorage,
    })
  )
);
