import { create } from 'zustand';
//Internal app
import { UiStore } from '@/interfaces';

/**
 * Store and change show/hide Drawer
 *
 * @param LoadingScreen - Initial state {@defaultValue `false`}
 * @param setLoadingScreen - Function that sets the status
 * @param showModalError - State of modal Error
 * @param modalErrorObject - Modal title value
 * @param setModalError - Change state Modal Error
 * @param closeModalError - Close modal Error
 */
export const useUiStore = create<UiStore>()((set) => ({
  loadingScreen: false,

  setLoadingScreen: (status: any) => set({ loadingScreen: status }),

  showModalError: false,

  modalErrorObject: null,

  setModalError: (value: any) => set({ showModalError: true, modalErrorObject: value }),

  closeModalError: () => set({ showModalError: false }),
}));
