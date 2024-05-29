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
  drawerStatus: false,

  setDrawerStatus: (status) => set({ drawerStatus: status }),
}));
