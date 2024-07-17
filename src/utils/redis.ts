import { TIME_SESSION_REDIS } from '.';
import Redis, { RedisOptions } from 'ioredis';

const redis = {
  host: process.env.REDIS_HOST || '',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  username: process.env.REDIS_USER || '',
  password: process.env.REDIS_PASSWORD || '',
  db: 0,
  prefix: process.env.REDIX_PREFIX || '',
};

function getRedisConfiguration(): {
  host: string;
  port: number;
  username: string;
  password: string;
  db: number;
  prefix: string;
} {
  return redis;
}

export function createRedisInstance(config = getRedisConfiguration()) {
  try {
    const options: RedisOptions = {
      host: config.host,
      port: config.port,
      username: config.username,
      password: config.password,
      db: config.db,
      keyPrefix: config.prefix,
      lazyConnect: true,
      showFriendlyErrorStack: true,
      enableAutoPipelining: false,
      maxRetriesPerRequest: null,
      retryStrategy: (times: number) => {
        if (times == 1) {
          return undefined;
        }
        return Math.min(times * 200, 1000);
      },
      tls:
        process.env.REDIS_SSL === 'ON'
          ? {
              rejectUnauthorized: false,
            }
          : undefined,
    };

    const redis = new Redis(options);

    redis.on('error', () => {
      return false;
    });

    redis.on('ready', async () => {
      return true;
    });

    redis.on('end', () => {
      return true;
    });

    return redis;
  } catch (e) {
    throw new Error(`[Redis] Could not create a Redis instance`);
  }
}

export async function getRedis(dataGet: string) {
  try {
    const redis = createRedisInstance();
    const resData: string | null = await redis.get(`${dataGet}`);
    await redis.expire(`${dataGet}`, TIME_SESSION_REDIS);
    await redis.quit();

    return resData;
  } catch (error) {
    throw new Error('Error get data Redis.');
  }
}

export async function postRedis(keyRedis: any, newData: any) {
  try {
    const redis = createRedisInstance();
    if (keyRedis != null) {
      await redis.set(`${keyRedis}`, JSON.stringify(newData));
      await redis.expire(`${keyRedis}`, TIME_SESSION_REDIS);
    }

    redis.quit();
  } catch (error) {
    throw new Error('Error post data Redis: ');
  }
}

export async function putRedis(keyRedis: any, newData: any) {
  try {
    const redis = createRedisInstance();
    const dataRedis: string | null = await redis.get(`${keyRedis}`);
    let stateObject: any;

    if (dataRedis) {
      stateObject = JSON.parse(dataRedis);
      const newObject = { ...stateObject, ...newData };
      await redis.set(`${keyRedis}`, JSON.stringify(newObject));
    }

    await redis.expire(`${keyRedis}`, TIME_SESSION_REDIS);

    redis.quit();
  } catch (error) {
    throw new Error('Error put data Redis: ');
  }
}

export async function delRedis(sesionId: string) {
  try {
    const redis = createRedisInstance();
    redis.del(sesionId);
    redis.quit();
  } catch (error) {
    throw new Error('Error delete data Redis.');
  }
}
