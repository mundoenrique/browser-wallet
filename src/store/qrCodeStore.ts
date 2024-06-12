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
  /**
   * Set the new data user
   */
  cardIdActivate: null,
  /**
   * Set the new cardId activate
   */

  setUser: (data: any) => set(() => ({ user: data })),
  setCardIdActivate: (data: string) => set(() => ({ cardIdActivate: data })),
}));
