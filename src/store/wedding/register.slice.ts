import { StateCreator } from 'zustand';
//Internal app
import { RegisterStore } from '@/interfaces';

export const createRegisterSlice: StateCreator<RegisterStore> = (set) => ({
  step: 0,

  showHeader: true,

  setShowHeader: (value) => set({ showHeader: value }),

  inc: () => set((state) => ({ step: state.step + 1 })),

  dec: () => set((state) => ({ step: state.step - 1 })),

  updateStep: (newAmount) => set({ step: newAmount }),

  ONB_PHASES_TERMS: null,

  ONB_PHASES_CONSULT_DATA: null,

  ONB_PHASES_PEP: null,

  biometricFormState: null,

  user: {
    firstName: null,
    lastName: null,
    userId: null,
  },

  termsDefinition: [
    {
      name: 'TERMINO 1',
      code: 'TERM1',
    },

    {
      name: 'TERMINO 2',
      code: 'TERM2',
    },
    {
      name: 'TERMINO 3',
      code: 'TERM3',
    },
  ],

  onboardingUuId: null,

  updateFormState: (form, data) => set((state) => ({ ...state, [form]: data })),
});
