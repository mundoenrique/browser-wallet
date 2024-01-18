import { create } from 'zustand';

//store
export const stepperStore = create((set) => ({
  step: 0,
  inc: () => set((state: any) => ({ step: state.step + 1 })),
  dec: () => set((state: any) => ({ step: state.step - 1 })),
  updateStep: (newAmount: number) => set({ step: newAmount }),
}));
