import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
//Internal app

interface MockStore {
  mockData: { [key: string]: any };
  setMockData: Function;
}

export const useMockStore = create<MockStore>()(
  devtools(
    persist(
      (set) => ({
        mockData: {},

        setMockData: (dataToUpdate: any) =>
          set((state: any) => ({
            ...state,
            mockData: {
              ...state.mockData,
              ...dataToUpdate,
            },
          })),
      }),
      {
        name: 'identity-store',
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
