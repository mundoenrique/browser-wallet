import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';
//Internal app
import { CatalogsStore } from '@/interfaces';

/**
 * Stores catalogs data for de inputs
 *
 * @param departamentsCatalog - Storage of the level one geo-location
 * @param provincesCatalog - Storage of the ocupation form data
 * @param districtsCatalog - Storage of the level two geo-location
 * @param documentTypesCatalog - Storage of the documentType
 * @param occupationCatalog - Storage of the level three geo-location
 * @param countriesCatalog - Storage of countries info
 * @param termsCatalog - Storage of terms
 * @param passwordTermsCatalog - Storage of terms for password
 * @param updateCatalog - Function to set the data of catalogs
 */
export const useCatalogsStore = create<CatalogsStore>()(
  devtools(
    persist(
      (set) => ({
        departamentsCatalog: [],

        provincesCatalog: [],

        districtsCatalog: [],

        documentTypesCatalog: [],

        occupationCatalog: [],

        countriesCatalog: [],

        termsCatalog: [],

        passwordTermsCatalog: [],

        updateCatalog: (catalog, data) => set((state) => ({ ...state, [catalog]: data })),
      }),
      { name: 'catalog-store', storage: createJSONStorage(() => localStorage) }
    )
  )
);
