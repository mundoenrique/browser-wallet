import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface SignupStore {
  step: number;
  showHeader: boolean;
  setShowHeader: (value: boolean) => void;
  inc: () => void;
  dec: () => void;
  updateStep: (amount: number) => void;
  updateFormState: (form: string, data: {}) => void;
  verificationFormState: object | null;
  ocupationFormState: object | null;
  pepFormState: object | null;
  biometricFormState: null | null;
}

export const useSignupStore = create<SignupStore>()(
  devtools((set) => ({
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
  }))
);
