import { StateStorage, createJSONStorage } from 'zustand/middleware';
import { setDataRedis } from '@/utils/toolHelper';


const storageApi: StateStorage = {

  getItem: async function (name: string): Promise<string | null> {
    try {

      const response = await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/v1/redis`);
      const dataRedis = await response.json();

      return JSON.stringify(dataRedis);

    } catch (error) {
      console.error(error);
      return null;
    }
  },

  setItem: async function (name: string, value: any): Promise<void> {

    const data = JSON.parse(value)

    await setDataRedis('PUT', {uuid:null, dataRedis: data.state })

    return;
  },

  removeItem: function (name: string): void | Promise<void> {
    console.log('removeItem', name);
  },
};

export const redisStorage = createJSONStorage(() => storageApi);