import { create } from 'zustand';
//Internal app
import { UiStore } from '@/interfaces';

/**
 * Store and change show/hide Drawer
 *
 * @param LoadingScreen - Initial state {@defaultValue `false`}
 * @param setLoadingScreen - Function that sets the status
 */
export const useUiStore = create<UiStore>()((set) => ({
  /**
   * Status for show/hide Drawer
   */
  loadingScreen: false,
  /**
   * Set value for the status of drawer
   */
  setLoadingScreen: (status: any) => set({ loadingScreen: status }),
  /**
   * State of modal Error
   */
  showModalError: false,
  /**
   * Modal title value
   */
  modalErrorObject: null,
  /**
   * Change state Modal Error
   */
  setModalError: (value: any) => set({ showModalError: true, modalErrorObject: value }),
  /**
   * Close modal Error
   */
  closeModalError: () => set({ showModalError: false }),
}));
