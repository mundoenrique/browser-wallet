//Internal app
import { createRedisInstance } from '@/utils/redis';
import { NotFoundError } from '@/components';
import DataUser from './partial/DataUser';

export default async function UserPage({ params }: any) {
  // const redis = createRedisInstance();
  const { user } = params;
  let userData;
  /*   const userData = await redis.get(`${user}`);
  redis.del(`${user}`);
  redis.quit(); */
  console.log(user);
  if (!userData) {
    return <NotFoundError code={404} />;
  }

  return <DataUser user={userData} />;
}
