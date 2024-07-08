import { StateCreator, create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
//Internal app
import { ICollectStore, ILinkData, ILoad } from '@/interfaces';
import { redisStorage } from './storages/redis.store';

const storeAPi: StateCreator<ICollectStore, [['zustand/devtools', never]]> = (set) => ({

  load: null,
  linkData: null,
  setLoad: (data: ILoad) => set({ load: data }),
  setLinkData: (data: ILinkData) => set({ linkData: data }),
  reset: () => set((state) => ({ ...state, load: null, linkData: null }))
});

export const useCollectStore = create<ICollectStore>()(
  devtools(
    persist(storeAPi, {
      name: 'collect-storage',
      storage: redisStorage,
    })
  )
);