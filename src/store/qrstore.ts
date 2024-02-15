import { create } from 'zustand';

type Store = {
  user: any | null;
  setUser: (data: any) => void;
};

export const useQrStore = create<Store>((set) => ({
  user: null,
  setUser: (data: any) => set(() => ({ user: data })),
}));
