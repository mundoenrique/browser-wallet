import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
//Internal app
import { ActiveAppStore } from '@/interfaces';

/**
 * Store for navMenu
 *
 * @param activeApp - Initial state {@defaultValue `false`}
 * @param initAccess - Initial state {@defaultValue `false`}
 * @param createAccess - Initial state {@defaultValue ``}
 * @param setActiveApp - Function that sets the new value
 * @param setinitAccess - Function that sets the new value
 * @param setCreateAccess - Function that sets the new value
 *
 * @remarks This state persists in sessionStorage
 */
export const useActiveAppStore = create<ActiveAppStore>()(
  persist(
    (set) => ({
      activeApp: false,
      initAccess: false,
      createAccess: '',
      setActiveApp: (activeApp) => set({ activeApp }),
      setInitAccess: (initAccess) => set({ initAccess }),
      setCreateAccess: (createAccess) => set({ createAccess })
    }),
    {
      name: 'active-store',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
