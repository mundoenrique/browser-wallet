import { create } from 'zustand';
//Internal app
import { LoadingScreenStore } from '@/interfaces';

/**
 * Store and change show/hide Drawer
 *
 * @param LoadingScreen - Initial state {@defaultValue `false`}
 * @param setLoadingScreen - Function that sets the status
 */
export const useUiStore = create<LoadingScreenStore>()((set) => ({
  /**
   * Status for show/hide Drawer
   */
  loadingScreen: false,
  /**
   * Set value for the status of drawer
   */
  setLoadingScreen: (status: any) => set({ loadingScreen: status }),
}));
