import { type StateCreator, create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
//Internal app
import { useWeddingBoundStore } from './wedding';
import { redisStorage } from '@/store/storages/redis.store';
import { HeadersStore } from '@/interfaces';

/**
 * Stores the url of the parent application
 *
 * @param backLink - Url parent app {@defaultValue `''`}
 * @param setBackLink - Function to change url
 * @param host - host app {@defaultValue `''`}
 * @param setHost - Function to change host
 *
 */
const storeAPi: StateCreator<HeadersStore, [['zustand/devtools', never]]> = (set) => ({
  backLink: '',
  host: '',
  setBackLink: (value: any) => set({ backLink: value }, false, 'setBackLink'),
  setHost: (value: any) => set({ host:value }, false, 'setHost')
});

export const useHeadersStore = create<HeadersStore>()(
  devtools(
    persist(storeAPi, {
      name: 'back-storage',
      storage: redisStorage,
    })
  )
);
