import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';
//Internal app
import { CatalogsStore } from '@/interfaces';

/**
 * Stores catalogs data for de inputs
 */
export const useCatalogsStore = create<CatalogsStore>()(
  devtools(
    persist(
      (set) => ({
        /**
         * Storage of the level one geo-location
         */
        departamentsCatalog: [],
        /**
         * Storage of the ocupation form data
         */
        provincesCatalog: [],
        /**
         *  Storage of the level two geo-location
         */
        districtsCatalog: [],
        /**
         *  Storage of the documentType
         */
        documentTypesCatalog: [],
        /**
         *  Storage of the level three geo-location
         */
        occupationCatalog: [],
        /**
         * Storage of countries info
         */
        countriesCatalog: [],
        /**
         * Storage of terms
         */
        termsCatalog: [],
        /**
         * Storage of terms for password
         */
        passwordTermsCatalog: [],
        /**
         * Function to set the data of catalogs
         */
        updateCatalog: (catalog, data) => set((state) => ({ ...state, [catalog]: data })),
      }),
      { name: 'catalogStore', storage: createJSONStorage(() => localStorage) }
    )
  )
);
