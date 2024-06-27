import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { createJwtSlice } from './jwt.slice';
import { createKeySlice } from './key.slice';
import { createUserSlice } from './user.slice';
import { createRegisterSlice } from './register.slice';
import { createHeadersSlice } from './headers.slice';

// Crear el store
export const useWeddingBoundStore = create<any>()(
  // persist(
  devtools(
    (...a) => ({
      ...createJwtSlice(...a),
      ...createKeySlice(...a),
      ...createUserSlice(...a),
      ...createRegisterSlice(...a),
      ...createHeadersSlice(...a)
    })
    // ), { name: 'wedding-store' }
  )
);