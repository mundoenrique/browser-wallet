import Redis, { RedisOptions } from 'ioredis';
//Internal app

const redis = {
  host: process.env.REDIS_HOST || '',
  password: process.env.REDIS_PASSWORD || '',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  db: 0,
  prefix: process.env.REDIX_PREFIX || '',
};

function getRedisConfiguration(): {
  port: number;
  host: string;
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
      db: config.db,
      password: config.password,
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
