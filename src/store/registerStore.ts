import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';
//Internal app
import { RegisterStore } from '@/interfaces';

/**
 * Stores and modifies the status of onboarding process screens and forms
 */
export const useRegisterStore = create<RegisterStore>()(
  devtools(
    persist(
      (set) => ({
        /**
         * A variable representing the screen on which the onboarding process is currently in progress
         */
        step: 0,
        /**
         * Sets the value of the variable that hides/shows the header.
         */
        showHeader: true,
        /**
         * Increases the step by 1 which leads to navigate to the following screen
         */
        setShowHeader: (value) => set({ showHeader: value }),
        /**
         * Decreases the step by 1 which leads to navigate to the back screen
         */
        inc: () => set((state) => ({ step: state.step + 1 })),
        /**
         * Goes to the step specified in the parameter
         */
        dec: () => set((state) => ({ step: state.step - 1 })),
        /**
         * Updates the storage of the given form
         */
        updateStep: (newAmount) => set({ step: newAmount }),
        /**
         * Storage of the verification form data
         */
        ONB_PHASES_TERMS: null,
        /**
         * Storage of the ocupation form data
         */
        ONB_PHASES_CONSULT_DATA: null,
        /**
         * Storage of the pep form data
         */
        ONB_PHASES_PEP: null,
        /**
         * Storage of the biometric form data
         */
        biometricFormState: null,
        /**
         * Storaage user info
         */
        user: null,
        /**
         * Storage of terms info
         */
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
        /**
         * Storage of terms info
         */
        onboardingUuid: null,
        /**
         * Function to set the data of completed forms
         */
        updateFormState: (form, data) => set((state) => ({ ...state, [form]: data })),
      }),
      { name: 'appStore', storage: createJSONStorage(() => sessionStorage) }
    )
  )
);
