import { StateStorage, createJSONStorage } from 'zustand/middleware';
import { setDataRedis } from '@/utils/toolHelper';


const storageApi: StateStorage = {

  getItem: async function (name: string): Promise<string | null> {
    try {

      const data = await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/v1/redis`)
        .then((res) => res.json());

      return data;

    } catch (error) {
      console.error(error);
      return null;
    }
  },

  setItem: async function (name: string, value: any): Promise<void> {

    await setDataRedis('PUT', {uuid:null, data: value })

    return;
  },

  removeItem: function (name: string): void | Promise<void> {
    console.log('removeItem', name);
  },
};

export const redisStorage = createJSONStorage(() => storageApi);