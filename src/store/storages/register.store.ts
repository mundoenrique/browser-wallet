import { StateStorage, createJSONStorage } from 'zustand/middleware';
//Internal app
import { decryptForge, setDataRedis } from '@/utils/toolHelper';

const storageApi: StateStorage = {
  getItem: async function (name: string): Promise<string | null> {
    try {
      const data = await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/v1/redis`).then((res) => res.json());

      if (data.data) {
        const decrypt = decryptForge(data.data);
        const response = JSON.parse(decrypt);

        return JSON.stringify(response.register);
      }

      return '';
    } catch (error) {
      return null;
    }
  },

  setItem: async function (name: string, value: any): Promise<void> {
    const register = JSON.parse(value);
    await setDataRedis('PUT', { uuid: null, data: { register } });

    return;
  },

  removeItem: function (name: string): void | Promise<void> {
    return;
  },
};

export const redisStorage = createJSONStorage(() => storageApi);
