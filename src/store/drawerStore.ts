import { create } from 'zustand';
//Internal app
import { DrawerStatus } from '@/interfaces';

/**
 * Store and change show/hide Drawer
 *
 * @param drawerStatus - Initial state {@defaultValue `false`}
 * @param updateDrawerStatus - Function that sets the status
 */
export const useDrawerStore = create<DrawerStatus>()((set) => ({
  /**
   * Status for show/hide Drawer
   */
  drawerStatus: false,
  /**
   * Set value for the status of drawer
   */
  setDrawerStatus: (status) => set({ drawerStatus: status }),
}));
