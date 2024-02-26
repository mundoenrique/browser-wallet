import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
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
        verificationFormState: null,
        /**
         * Storage of the ocupation form data
         */
        ocupationFormState: null,
        /**
         * Storage of the pep form data
         */
        pepFormState: null,
        /**
         * Storage of the biometric form data
         */
        biometricFormState: null,
        /**
         * Function to set the data of completed forms
         */
        updateFormState: (form, data) => set((state) => ({ ...state, [form]: data })),
      }),
      { name: 'appStore', storage: createJSONStorage(() => sessionStorage) }
    )
  )
);
