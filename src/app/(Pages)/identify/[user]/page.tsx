import { headers } from 'next/headers';
//Internal app
import DataUser from './partial/DataUser';
import { NotFoundError } from '@/components';
import { createRedisInstance } from '@/utils/redis';

export default async function UserPage({ params }: any) {
  const headersList = headers();
  const redis = createRedisInstance();
  const { user } = params;

  const referer = headersList.get('referer') || '';
  const host = headersList.get('host');

  const userData = await redis.get(`${user}`);
  redis.del(`${user}`);
  redis.quit();

  if (!userData) return <NotFoundError code={404} />;

  return <DataUser user={userData} referer={referer} host={host} />;
}
