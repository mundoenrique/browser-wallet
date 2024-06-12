import { create } from 'zustand';
//Internal app
import { UiStore } from '@/interfaces';

/**
 * Store and change states for show/hide elements in UI
 *
 * @param LoadingScreen - Initial state {@defaultValue `false`}
 * @param setLoadingScreen - Function that sets the status
 * @param showModalError - State of modal Error
 * @param modalErrorObject - Modal title value
 * @param setModalError - Change state Modal Error
 * @param closeModalError - Close modal Error
 */
export const useUiStore = create<UiStore>()((set) => ({
  /**
   * Value to show/hide global LoadingScreen component
   */
  loadingScreen: false,
  /**
   * Function to set loading screen
   */
  setLoadingScreen: (status, options) =>
    set((state) => ({
      ...state,
      loadingScreen: status,
      loadingScreenOptions: (() => {
        if (options) {
          return options;
        } else {
          return {};
        }
      })(),
    })),

  loadingScreenOptions: {},
  /**
   * Set value to show Modal Error alert
   */
  showModalError: false,
  /**
   * Object for ModalError Message
   */
  modalErrorObject: null,
  /**
   * Reload function
   */
  reloadFunction: null,
  /**
   * Change state Modal Error
   */
  setModalError: (value: any) => set({ showModalError: true, modalErrorObject: value }),
  /**
   * Close Modal Error
   */
  closeModalError: () => set({ showModalError: false }),
  setReloadFunction: (func: any) => set({ reloadFunction: func }),
  clearReloadFunction: () => set({ reloadFunction: null }),
}));
