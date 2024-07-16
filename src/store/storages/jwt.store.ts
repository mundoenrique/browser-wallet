import { decryptForge, setDataRedis } from '@/utils/toolHelper';
import { StateStorage, createJSONStorage } from 'zustand/middleware';

const storageApi: StateStorage = {
  getItem: async function (name: string): Promise<string | null> {
    try {
      const data = await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/v1/redis`).then((res) => res.json());

      if (data.data) {
        const decrypt = decryptForge(data.data);
        const response = JSON.parse(decrypt);

        return JSON.stringify(response.jwt);
      }

      return '';
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  setItem: async function (name: string, value: any): Promise<void> {
    const jwt = JSON.parse(value);
    await setDataRedis('PUT', { uuid: null, data: { jwt } });

    return;
  },

  removeItem: function (name: string): void | Promise<void> {
    console.log('removeItem', name);
  },
};

export const redisStorage = createJSONStorage(() => storageApi);
