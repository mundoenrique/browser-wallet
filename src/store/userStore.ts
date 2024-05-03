import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';
//Internal app
import { TUserDetail, UserStore } from '@/interfaces';
import { decryptForge } from '@/utils/toolHelper';

export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        userId: null,
        setUser: (data: TUserDetail) => set({ user: data }),
        setUserId: (data: string) => set({ userId: data }),
        getUserPhone: () => {
          const { phoneNumber } = get().user;
          return decryptForge(phoneNumber);
        },
        getUserCardId: () => {
          const {
            cardSolutions: { cardId },
          } = get().user;
          return decryptForge(cardId);
        },
      }),
      {
        name: 'user-storage',
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
