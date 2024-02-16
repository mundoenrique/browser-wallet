import { create } from 'zustand';
import { NavTitleStore } from '@/interfaces';

/**
 * Store and change page/section title
 */

export const useNavTitleStore = create<NavTitleStore>()((set) => ({
  title: '',
  updateTitle: (newTitle) => set({ title: newTitle }),
}));
