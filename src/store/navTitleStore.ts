import { create } from 'zustand';

export const useNavTitleStore = create((set) => ({
  title: '',
  updateTitle: (newTitle: number) => set({ title: newTitle }),
}));
