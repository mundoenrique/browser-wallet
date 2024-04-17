import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';
//Internal app
import { OtpStore } from '@/interfaces';

export const useOtpStore = create<OtpStore>()(
  persist(
    (set, get) => ({
      timeLeft: 0,
      counting: false,
      setCounting: (value) => set({ counting: value }),
      countdown: () => {
        const { timeLeft } = get();
        if (timeLeft > 0) {
          set((state: any) => ({ timeLeft: state.timeLeft - 1 }));
        } else {
          set(() => ({ counting: false }));
        }
      },
      setTime: () => set({ timeLeft: 60 }),
    }),
    { name: 'timerStore', storage: createJSONStorage(() => sessionStorage) }
  )
);
