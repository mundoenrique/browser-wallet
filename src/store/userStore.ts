import { type StateCreator, create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
//Internal app
import { decryptForge } from '@/utils/toolHelper';
import { redisStorage } from '@/store/storages/user.store';
import { TUserDetail, UserStore } from '@/interfaces';

const storeAPi: StateCreator<UserStore, [['zustand/devtools', never]]> = (set, get) => ({
  user: null,

  userId: null,
  /**
   * set user object
   */
  setUser: (data: TUserDetail) => set({ user: data }),
  /**
   * set user Id
   */
  setUserId: (data: string) => set({ userId: data }),
  /**
   *
   * @returns user phone number
   */
  getUserPhone: () => {
    const { phoneNumber } = get().user;
    return decryptForge(phoneNumber);
  },
  /**
   *
   * @returns user cardId
   */
  getUserCardId: () => {
    const {
      cardSolutions: { cardId },
    } = get().user;
    return decryptForge(cardId);
  },
});

export const useUserStore = create<UserStore>()(
  devtools(
    persist(storeAPi, {
      name: 'user-storage',
      storage: redisStorage,
    })
  )
);
