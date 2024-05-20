import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';
//Internal app
import { decryptForge } from '@/utils/toolHelper';
import { TUserDetail, UserStore } from '@/interfaces';

/**
 * Store for user data
 */
export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set, get) => ({
        /**
         * user object
         */
        user: null,
        /**
         * user id
         */
        userId: null,
        /**
         * set user object
         */
        setUser: (data: TUserDetail) => set({ user: data }),
        /**
         * set user id
         */
        setUserId: (data: string) => set({ userId: data }),
        /**
         * return user phone
         */
        getUserPhone: () => {
          const { phoneNumber } = get().user;
          return decryptForge(phoneNumber);
        },
        /**
         * return user card id
         */
        getUserCardId: () => {
          const {
            cardSolutions: { cardId },
          } = get().user;
          return decryptForge(cardId);
        },
      }),
      {
        name: 'user-store',
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
