import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import { SignupStore } from '@/interfaces';

/**
 * Stores and modifies the status of onboarding process screens and forms
 */

export const useSignupStore = create<SignupStore>()(
  devtools(
    persist(
      (set) => ({
        step: 0,
        showHeader: true,
        setShowHeader: (value) => set({ showHeader: value }),
        inc: () => set((state) => ({ step: state.step + 1 })),
        dec: () => set((state) => ({ step: state.step - 1 })),
        updateStep: (newAmount) => set({ step: newAmount }),
        verificationFormState: null,
        ocupationFormState: null,
        pepFormState: null,
        biometricFormState: null,
        updateFormState: (form, data) => set((state) => ({ ...state, [form]: data })),
      }),
      { name: 'appStore', storage: createJSONStorage(() => sessionStorage) }
    )
  )
);
