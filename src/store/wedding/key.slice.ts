import { StateCreator } from 'zustand';

//Internal app
import { KeyStoreProps } from '@/interfaces';


export const createKeySlice: StateCreator<KeyStoreProps> = (set) => ({
  jwePublicKey: null,
  jwePrivateKey: null,
  jwsPublicKey: null,
  jwsPrivateKey: null,

  setKeys: ({ jwePublicKey, jwePrivateKey, jwsPublicKey, jwsPrivateKey }) =>
    set({ jwePublicKey, jwePrivateKey, jwsPublicKey, jwsPrivateKey })
});