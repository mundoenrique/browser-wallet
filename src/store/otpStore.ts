import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
//Internal app
import { OtpStore } from '@/interfaces';

/**
 * set config for global OTP
 *
 * @param otpValid - Set OTP valid context
 * @param otpUuid - OTP request uuid value
 * @param countdown - Functions that run countdown
 * @param setTime - Funtion that establish init time
 * @param setOtpUuid - Set the Otp uuid Value
 * @param setOTPValid - Funtion that establish if otp is valid
 */
export const useOtpStore = create<OtpStore>()(
  persist(
    (set, get) => ({
      otpValid: 'OTP',

      otpUuid: '',

      timeLeft: 0,

      countdown: () => {
        const { timeLeft } = get();
        if (timeLeft > 0) {
          set((state: any) => ({ timeLeft: state.timeLeft - 1 }));
        }
      },

      setTime: (value) => set({ timeLeft: value }),

      setOtpUuid: (value) => set({ otpUuid: value }),

      setOTPValid: (value) => set({ otpValid: value }),
    }),
    { name: 'timer-store', storage: createJSONStorage(() => sessionStorage) }
  )
);
