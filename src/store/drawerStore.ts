import { create } from 'zustand';
//Internal app
import { DrawerStatus } from '@/interfaces';

/**
 * Store and change show/hide Drawer
 *
 * @param showStatus - Initial state {@defaultValue `false`}
 * @param updateDrawerStatus - Function that sets the status
 */
export const useDrawerStore = create<DrawerStatus>()((set) => ({
  /**
   * Status for show/hide Drawer
   */
  showStatus: false,
  /**
   * Set value for the status of drawer
   */
  updateDrawerStatus: (status) => set({ showStatus: status }),
}));
