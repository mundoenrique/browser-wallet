import { create } from 'zustand';

export const useSignupStore = create((set) => ({
  step: 0,
  inc: () => set((state: any) => ({ step: state.step + 1 })),
  dec: () => set((state: any) => ({ step: state.step - 1 })),
  updateStep: (newAmount: number) => set({ step: newAmount }),
}));
