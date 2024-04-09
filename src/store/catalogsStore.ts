import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';
//Internal app
import { CatalogsStore } from '@/interfaces';

/**
 * Stores catalogs data for de inputs
 */
export const catalogsStore = create<CatalogsStore>()(
  devtools(
    persist(
      (set) => ({
        /**
         * Storage of the verification form data
         */
        departaments: null,
        /**
         * Storage of the ocupation form data
         */
        province: null,
        /**
         * Storage of the pep form data
         */
        districs: null,
        /**
         * Storage of the biometric form data
         */
        companyType: null,
        /**
         * Storaage user info
         */
        ocupation: null,
        /**
         * Storage of countries info
         */
        countriesCatalog: [],
        /**
         * Storage of terms
         */
        termsCatalog: [],
        /**
         * Function to set the data of completed forms
         */
        updateCatalog: (catalog, data) => set((state) => ({ ...state, [catalog]: data })),
      }),
      { name: 'catalogStore', storage: createJSONStorage(() => sessionStorage) }
    )
  )
);
