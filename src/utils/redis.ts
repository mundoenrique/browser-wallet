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
      console.log('🚀 ~ redis.on ~ error:', error);
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
