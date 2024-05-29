import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';
//Internal app
import { decryptForge } from '@/utils/toolHelper';
import { TUserDetail, UserStore } from '@/interfaces';

/**
 * Store for user data
 *
 * @param user - User object {@defaulValue `null`}
 * @param userId - User id {@defaulValue `null`}
 * @param setUser - Set user object
 * @param setUserId - Set user id
 * @param getUserPhone - Return user phone
 * @param getUserCardId - Return user card id
 */
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
        name: 'user-store',
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
