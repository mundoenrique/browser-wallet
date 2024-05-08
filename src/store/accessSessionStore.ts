import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

/// Eliminar despues de la certificacion de Inicio de sesión
export const accessSessionStore = create<any>()(
  devtools(
    persist(
      (set) => ({
        accessSession: false,
        setAccessSession: (status: any) => set({ accessSession: status }),
      }),
      {
        name: 'access-store',
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
