//Internal app
import DataUser from './partial/DataUser';
import { NotFoundError } from '@/components';
import { createRedisInstance } from '@/utils/redis';

export default async function UserPage({ params }: any) {
  const redis = createRedisInstance();
  const { user } = params;

  const userData = await redis.get(`${user}`);
  redis.del(`${user}`);
  redis.quit();

  if (!userData) {
    return <NotFoundError code={404} />;
  }

  return <DataUser user={userData} />;
}
