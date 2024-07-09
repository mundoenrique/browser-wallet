import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
//Internal app
import { ChargeStore } from '@/interfaces';

/**
 * Store charge amount
 *
 * @param chargeAmount - Initial state {@defaultValue `0`}
 * @param setCharge - Function that sets the new value
 */
export const useChargeStore = create<ChargeStore>()(
  persist(
    (set) => ({
      chargeAmount: 0,
      setCharge: (data: number) => set(() => ({ chargeAmount: data })),
    }),
    { name: 'charge-store', storage: createJSONStorage(() => sessionStorage) }
  )
);
