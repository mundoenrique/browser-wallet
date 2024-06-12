import { type StateCreator, create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';
//Internal app
import { redisStorage } from '@/store/storages/redis.store';
import { useWeddingBoundStore } from './wedding';
import { decryptForge } from '@/utils/toolHelper';
import { TUserDetail, UserStore } from '@/interfaces';

const storeAPi: StateCreator<UserStore, [['zustand/devtools', never]]> = (set,get) => ({
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

export const useUserStore = create<UserStore>()(
  devtools(
    persist(storeAPi, {
      name: 'user-storage',
      storage: redisStorage,
    })
  )
);

useUserStore.subscribe((nextState /*prevState*/) => {
  const { user, userId } = nextState;

  useWeddingBoundStore.getState().setUser(user);
  useWeddingBoundStore.getState().setUserId(userId);
});

