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
   * set  Modal title
   */
  modalErrorTitle: '',
  /**
   * set  Modal desc
   */
  modalErrorDesc: '',
  /**
   * Change state Modal Error
   */
  setModalError: (status: { title: string; description: string }) =>
    set({ showModalError: true, modalErrorTitle: status.title, modalErrorDesc: status.description }),
  /**
   * Close modal Error
   */
  closeModalError: () => set({ showModalError: false }),
}));
