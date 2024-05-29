import { create } from 'zustand';
//Internal app
import { NavTitleStore } from '@/interfaces';

/**
 * Store and change page/section title
 *
 * @param title - Initial state {@defaultValue `' '`}
 * @param updateTitle - Function that sets the new value
 */
export const useNavTitleStore = create<NavTitleStore>()((set) => ({
  title: '',

  updateTitle: (newTitle) => set({ title: newTitle }),
}));
