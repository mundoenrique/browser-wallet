import { create } from 'zustand';
//Internal app
import { ConfigCardStore } from '@/interfaces';

/**
 * Store and change page for Card Config
 *
 * @param Page - Initial state {@defaultValue `' '`}
 * @param updatePage - Function that sets the new value
 */
export const useConfigCardStore = create<ConfigCardStore>()((set) => ({
  page: '',

  updatePage: (newPage) => set({ page: newPage }),
}));
