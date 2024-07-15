import { type StateCreator, create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
//Internal app
import { RegisterStore } from '@/interfaces';
import { redisStorage } from '@/store/storages/register.store';

/**
 * Stores and modifies the status of onboarding process screens and forms
 *
 * @param step - A variable representing the screen on which the onboarding process is currently in progress {@defaultValue `0`}
 * @param showHeader - Sets the value of the variable that hides/shows the header.
 * @param setShowHeader - Increases the step by 1 which leads to navigate to the following screen
 * @param inc - Decreases the step by 1 which leads to navigate to the back screen
 * @param dec - Goes to the step specified in the parameter
 * @param updateStep - Updates the storage of the given form
 * @param ONB_PHASES_TERMS - Storage of the verification form data
 * @param ONB_PHASES_CONSULT_DATA - Storage of the ocupation form data
 * @param ONB_PHASES_PEP - Storage of the pep form data
 * @param biometricFormState - Storage of the biometric form data
 * @param user - Storaage user info
 * @param termsDefinition - Storage of terms info
 * @param onboardingUuId - Storage of onboarding uuid
 * @param updateFormState - Function to set the data of completed forms
 */

const storeAPi: StateCreator<RegisterStore, [['zustand/devtools', never]]> = (set) => ({
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
  control: null,

  updateFormState: (form, data) => set((state) => ({ ...state, [form]: data })),
  updateControl: (data: any) => set({ control: data })
});

export const useRegisterStore = create<RegisterStore>()(
  devtools(
    persist(storeAPi, {
      name: 'app-storage',
      storage: redisStorage,
    })
  )
);