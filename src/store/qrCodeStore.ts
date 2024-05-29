import { create } from 'zustand';
//Internal app
import { QrPropsStore } from '@/interfaces';

/**
 * Store QR code
 *
 * @param user - Initial state {@defaultValue `null`}
 * @param setUser - Function that sets the new value
 */
export const useQrStore = create<QrPropsStore>((set) => ({
  user: null,

  setUser: (data: any) => set(() => ({ user: data })),
}));
