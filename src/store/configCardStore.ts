import { StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
//Internal app
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
  page: '',

  updatePage: (newPage) => {
    set({ page: newPage });
  },

  cardActivationStatus: '',

  isCardBlocked: () => {
    const blockObject = get().blockType;
    return Object.hasOwn(blockObject, 'code');
  },

  blockType: {},

  cardType: '',

  cardStatus: '',

  cardInfo: false,

  updateCardInfo: false,

  toggleUpdate: () => set((state) => ({ updateCardInfo: !state.updateCardInfo })),

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
