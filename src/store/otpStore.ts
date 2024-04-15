import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';
//Internal app
import { OtpStore } from '@/interfaces';

export const useOtpStore = create<OtpStore>()(
  persist(
    (set, get) => ({
      otpTimeLeft: 0,
      initialized: false,
      setInitialized: (value) => set({ initialized: value }),

      countdown: () => {
        const { otpTimeLeft } = get();
        if (otpTimeLeft > 0) {
          set((state: any) => ({ otpTimeLeft: state.otpTimeLeft - 1 }));
        }
      },
      resetOtp: () => set({ otpTimeLeft: 60, initialized: false }),
    }),
    { name: 'timerStore', storage: createJSONStorage(() => sessionStorage) }
  )
);
