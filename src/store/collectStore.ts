import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
//Internal app
import { ICollectStore, ILinkData, ILoad } from '@/interfaces';

export const useCollectStore = create<ICollectStore>()(
  persist(
    (set) => ({
      load: null,
      linkData: null,
      setLoad: (data: ILoad) => set({ load: data }),
      setLinkData: (data: ILinkData) => set({ linkData: data }),
    }),
    { name: 'collect-store', storage: createJSONStorage(() => sessionStorage) }
  )
);
