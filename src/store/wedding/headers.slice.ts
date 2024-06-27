import { StateCreator } from 'zustand';

//Internal app
import { HeadersStore } from '@/interfaces/store';

export const createHeadersSlice: StateCreator<HeadersStore> = (set) => ({
  backLink: '',
  setBackLink: (status: any) => set({ backLink: status }),
  host: '',
  setHost: (status: any) => set({ host: status })

});