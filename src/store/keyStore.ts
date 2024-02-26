import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
//Internal app
import { KeyStoreProps } from '@/interfaces/store';

export const useKeyStore = create<KeyStoreProps>()(
  devtools(
    persist(
      (set) => ({
        publicKey: null,
        privateKey: null,
        setKeys: (keys) => set({ publicKey: keys.publicKey, privateKey: keys.privateKey }),
      }),
      {
        name: 'key-store',
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
