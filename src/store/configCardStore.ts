import { StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
//Internal app
import { useUserStore } from './userStore';
import { ConfigCardStore } from '@/interfaces';
import { redisStorage } from '@/store/storages/card.store';

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
const storeAPi: StateCreator<ConfigCardStore, [['zustand/devtools', never]]> = (set, get) => ({
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
    const user = useUserStore.getState().user;
    if (!Object.hasOwn(user, 'physicalCards')) {
      return 'NONE';
    }
    return user.physicalCards.status;
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
    return cardType && cardType === 'PHYSICAL';
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
});

export const useConfigCardStore = create<ConfigCardStore>()(
  devtools(
    persist(storeAPi, {
      name: 'card-storage',
      storage: redisStorage,
    })
  )
);
