import { type StateCreator, create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';
//Internal app
import { redisStorage } from '@/store/storages/redis.store';
import { useWeddingBoundStore } from './wedding';
import { decryptForge } from '@/utils/toolHelper';
import { TCardInformation, TUserDetail, UserStore } from '@/interfaces';

const storeAPi: StateCreator<UserStore, [['zustand/devtools', never]]> = (set,get) => ({
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

export const useUserStore = create<UserStore>()(
  devtools(
    persist(storeAPi, {
      name: 'user-storage',
      storage: redisStorage,
    })
  )
);

useUserStore.subscribe((nextState /*prevState*/) => {
  const { user, userId, cardInformation } = nextState;

  useWeddingBoundStore.getState().setUser(user);
  useWeddingBoundStore.getState().setUserId(userId);
  useWeddingBoundStore.getState().setCardInformation(cardInformation);
});

