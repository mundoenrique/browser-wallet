import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
//Internal app
import { OtpStore } from '@/interfaces';

/**
 * set config for global OTP
 *
 * @param otpValid - Set OTP valid context
 * @param timeLeft - Otp Time value for countdown
 * @param counting - Set if current has counting down
 * @param otpUuid - OTP request uuid value
 * @param otpCode - Otp code of client
 * @param setOtpCode - Set Otp Code Value
 * @param setOtpUuid - Set the Otp uuid Value
 * @param setCounting - Function to set counting value
 * @param countdown - Functions that run countdown
 * @param setTime - Funtion that establish init time
 * @param setOTPValid - Funtion that establish if otp is valid
 * @param reset - Funtion that establishet countown to initial values
 */
export const useOtpStore = create<OtpStore>()(
  persist(
    (set, get) => ({
      otpValid: 'OTP',

      timeLeft: 0,

      counting: false,

      otpUuid: '',

      otpCode: '',

      setOtpCode: (value) =>
        set({
          otpCode: value,
        }),

      setOtpUuid: (value) => set({ otpUuid: value }),

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

      reset: () => set((state) => ({ ...state, timeLeft: 60, counting: false })),

      setOTPValid: (value) => set({ otpValid: value }),
    }),
    { name: 'timer-store', storage: createJSONStorage(() => sessionStorage) }
  )
);
