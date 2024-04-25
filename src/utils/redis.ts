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

    redis.on('error', (error: unknown) => {
      return false;
    });

    redis.on('ready', async (error: unknown) => {
      return true;
    });

    redis.on('end', (error: unknown) => {
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
    const resData: string | null = await redis.get(`session:${dataGet}`);
    await redis.quit();

    return resData
  } catch (error) {
    throw new Error('Error get data Redis.');
  }
}

export async function postRedis(sessionId: any, newData: any) {

  try {
    const redis = createRedisInstance();

    const dataRedis: string | null = await redis.get(`session:${sessionId}`);
    if (dataRedis) {
      const resDataObj = JSON.parse(dataRedis)
      const dataUpdate = Object.assign({}, resDataObj, newData);
      await redis.set(`session:${sessionId}`, JSON.stringify(dataUpdate));
    } else {
      await redis.set(`session:${sessionId}`, JSON.stringify(newData));
    }
    await redis.expire(`session:${sessionId}`, 3000);

    redis.quit();

  } catch (error) {
    throw new Error('Error post data Redis: ');
  }
}

export async function delRedis(sesionId:string) {

  try {
    const redis = createRedisInstance();
    redis.del(sesionId);
    redis.quit()

  } catch (error) {
    throw new Error('Error delete data Redis.');
  }
}
