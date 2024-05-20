import { create } from 'zustand';
//Internal app
import { ConfigCardStore } from '@/interfaces';

/**
 * Store and change page for Card Config
 *
 * @param Page - Initial state {@defaultValue `' '`}
 * @param updatePage - Function that sets the new value
 */
export const useConfigCardStore = create<ConfigCardStore>()((set, get) => ({
  /**
   * Component name for de page/section rendering
   */
  page: '',
  /**
   * Set value for the page component
   */
  updatePage: (newPage) => {
    set({ page: newPage });
  },
  /**
   * set card activation status
   */
  cardActivationStatus: '',
  /**
   * Value for card block
   */
  isCardBlocked: false,
  /**
   * set card type attibute, if virtual then value is true, otherwise is false
   */
  isVirtualCard: false,
  /**
   * set  value for status of card activation
   */
  setCardActivationStatus: (status) => set({ cardActivationStatus: status }),
  /*
   * set value for isVirtualCard var
   */
  setVirtualCard: (status) => set({ isVirtualCard: status }),
  /*
   * return card activation status
   */
  getCardActivation: () => {
    const cardActivationStatus = get().cardActivationStatus;
    const statusObject = {};
  },
}));
