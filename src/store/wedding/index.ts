import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { createJwtSlice } from './jwt.slice';
import { createKeySlice } from './key.slice';
import { createUserSlice } from './user.slice';


// Crear el store
export const useWeddingBoundStore = create<any>()(
  // persist(
  devtools(
    (...a) => ({
      ...createJwtSlice(...a),
      ...createKeySlice(...a),
      ...createUserSlice(...a)
    })
    // ), { name: 'wedding-store' }
  )
);