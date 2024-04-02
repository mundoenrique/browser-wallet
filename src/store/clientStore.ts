import { create } from 'zustand';
//Internal app
import { ClientStore, IClientProps } from '@/interfaces';

/**
 * Store client
 *
 * @param client - Initial state {@defaultValue `null`}
 * @param setClient - Function that sets the new value
 */
export const useClientStore = create<ClientStore>((set) => ({
  client: null,
  setClient: (data: IClientProps) => set(() => ({ client: data })),
}));
