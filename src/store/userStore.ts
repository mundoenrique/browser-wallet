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
        setUser: (data: TUserDetail) => set({ user: data }),
        getUserId: () => get().user.userId,
        getUserPhone: () => {
          const { phoneNumber } = get().user;
          return decryptForge(phoneNumber);
        },
      }),
      {
        name: 'user-storage',
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
