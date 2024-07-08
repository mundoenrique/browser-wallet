import { StateCreator } from 'zustand';

//Internal app
import { JwtStoreProps } from '@/interfaces/store';

export const createJwtSlice: StateCreator<JwtStoreProps> = (set) => ({

  token: null,

  setToken: (token:string | null) => set({ token })
});