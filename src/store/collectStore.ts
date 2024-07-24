import { StateCreator, create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
//Internal app
import { redisStorage } from './storages/collect.store';
import { ICollectStore, ILinkData, ILoad } from '@/interfaces';

const storeAPi: StateCreator<ICollectStore, [['zustand/devtools', never]]> = (set) => ({
  load: null,
  linkData: null,
  setLoad: (data: ILoad) => set({ load: data }),
  setLinkData: (data: ILinkData) => set({ linkData: data }),
  reset: () => set((state) => ({ ...state, load: null, linkData: null })),
});

/**
 * Store collect flow
 *
 * @param load - Initial state {@defaultValue `null`}
 * @param linkData - Initial state {@defaultValue `null`}
 * @param setLoad - Handling data set in load
 * @param setLinkData - Handling data set in linkData
 * @param reset - Formats the load and linkData variables
 *
 * @remarks This state persists in redisStorage
 */
export const useCollectStore = create<ICollectStore>()(
  devtools(
    persist(storeAPi, {
      name: 'collect-storage',
      storage: redisStorage,
    })
  )
);
