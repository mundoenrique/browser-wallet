import { type StateCreator, create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
//Internal app
import { decryptForge } from '@/utils/toolHelper';
import { redisStorage } from '@/store/storages/user.store';
import { TCardInformation, TUserDetail, UserStore } from '@/interfaces';

const storeAPi: StateCreator<UserStore, [['zustand/devtools', never]]> = (set, get) => ({
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
