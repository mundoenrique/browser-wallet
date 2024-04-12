import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';
//Internal app
import { OtpStore } from '@/interfaces';

export const useOtpStore = create<OtpStore>()(
  persist(
    (set) => ({
      otpTimeLeft: 60,
      countdown: () => set((state: any) => ({ otpTimeLeft: state.otpTimeLeft - 1 })),
      resetOtp: () => set({ otpTimeLeft: 60 }),
    }),
    { name: 'timerStore', storage: createJSONStorage(() => sessionStorage) }
  )
);
