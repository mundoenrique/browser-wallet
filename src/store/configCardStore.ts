import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
//Internal app
import { ConfigCardStore } from '@/interfaces';

/**
 * Store and change page for Card Config
 *
 * @param Page - Initial state {@defaultValue `' '`}
 * @param updatePage - Function that sets the new value
 * @param cardActivationStatus - Status of phisycal card
 * @param setCardProperties - Function sets value for a key in store
 * @param isCardBlocked - Return a boolean for card block status
 * @param isCardVirtual - Return  a boolean for card Type
 * @param setCardActivationStatus - object
 */
export const useConfigCardStore = create<ConfigCardStore>()(
  devtools((set, get) => ({
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
     * Return true or false if card is blocked
     */
    isCardBlocked: () => {
      const blockObject = get().blockType;
      return Object.hasOwn(blockObject, 'code');
    },
    /**
     * Set card type attibute, if virtual then value is true, otherwise is false
     */
    isCardVirtual: () => {
      const cardType = get().cardType;
      return cardType === 'VIRTUAL';
    },
    /**
     * Card block type
     */
    blockType: {},
    /**
     * Type of card VIRTUAL / PHYSICAL
     */
    cardType: '',
    /**
     * Card status Active/Inactive
     */
    cardStatus: '',
    /**
     * set if card info is loaded
     */
    cardInfo: false,
    /**
     * Var to dispatch an update
     */
    updateCardInfo: false,
    /**
     * Dispatch an update
     */
    toggleUpdate: () => set((state) => ({ updateCardInfo: !state.updateCardInfo })),
    /**
     * set  values for  card object: cardType, cardBlockStatus, cardStatus
     */
    setCardProperties: (key, value) =>
      set((state) => {
        return { ...state, [key]: value };
      }),
  }))
);
