import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
//Internal app
import { OtpStore } from '@/interfaces';

/**
 * set config for global OTP
 */
export const useOtpStore = create<OtpStore>()(
  persist(
    (set, get) => ({
      /**
       * Set OTP valid context
       */
      otpValid: 'OTP',
      /**
       * Otp Time value for countdown
       */
      timeLeft: 0,
      /**
       * Set if current has counting down
       */
      counting: false,
      /**
       * function to set counting value
       */
      setCounting: (value) => set({ counting: value }),
      /**
       * Functions that run countdown
       */
      countdown: () => {
        const { timeLeft } = get();
        if (timeLeft > 0) {
          set((state: any) => ({ timeLeft: state.timeLeft - 1 }));
        } else {
          set(() => ({ counting: false }));
        }
      },
      /**
       * Funtion that establish init time
       */
      setTime: () => set({ timeLeft: 60 }),
      /**
       * Funtion that establish if otp is valid
       */
      setOTPValid: (value) => set({ otpValid: value }),
    }),
    { name: 'timerStore', storage: createJSONStorage(() => sessionStorage) }
  )
);
