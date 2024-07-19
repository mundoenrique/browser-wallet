import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
//Internal app
import { useUserStore } from './userStore';
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
  devtools(
    persist(
      (set, get) => ({
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
        cardInformation: {},
        /**
         * set card activation status
         */
        cardActivationStatus: () => {
          useUserStore.getState().user;
          return '';
        },
        /**
         * Return true or false if card is blocked
         */
        isCardBlocked: () => {
          const { blockType } = get().cardInformation;
          return blockType && Object.hasOwn(blockType, 'code');
        },
        isTempBlock: () => {
          const { blockType } = get().cardInformation;
          return blockType && Object.hasOwn(blockType, 'code') && blockType.code === 'PB';
        },
        isPhysicalCard: () => {
          const { cardType } = get().cardInformation;
          return cardType && cardType === 'PHYSIC';
        },
        /**
         * Card block type
         */
        blockType: {},
        /**
         * set  values for  card object: cardType, cardBlockStatus, cardStatus
         */
        setCardProperties: (key, value) =>
          set((state) => {
            return { ...state, [key]: value };
          }),
      }),
      { name: 'card-store', storage: createJSONStorage(() => sessionStorage) }
    )
  )
);
