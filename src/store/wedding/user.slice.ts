import { StateCreator } from 'zustand';

//Internal app
import { decryptForge } from '@/utils/toolHelper';
import { TCardInformation, TUserDetail, UserStore } from '@/interfaces';

export const createUserSlice: StateCreator<UserStore> = (set,get) => ({
  user: null,
  userId: null,
  cardInformation: null,

  setCardInformation: (data: TCardInformation) => set({ user: data }),

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
  isUserCardVirtual: () => {
    const cardInformation = get().cardInformation;
    return cardInformation ? cardInformation.cardType === 'VIRTUAL' : true;
  }
});