import { StateCreator } from 'zustand';

//Internal app
import { decryptForge } from '@/utils/toolHelper';
import { TUserDetail, UserStore } from '@/interfaces';

export const createUserSlice: StateCreator<UserStore> = (set,get) => ({
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
});