//Internal app
import DataUser from './partial/DataUser';
import { NotFoundError } from '@/components';
import { createRedisInstance } from '@/utils/redis';

export default function UserPage(params: any) {
  console.log('PARAMS: ', params)
  const redis = createRedisInstance();
  const user = params.user;
  console.log('USER: ', user)

  // Add null checks for params and user
  if (!params || !params.user) return <NotFoundError code={404} />;

  try {
    const userData = redis.get(`${user}`);
    const data = JSON.stringify(userData)
    // Check if userData exists before deleting and quitting
    if (data) {
      redis.del(`${data}`);
      redis.quit();
    }

    if (!data) return <NotFoundError code={404} />;

    return <DataUser user={data} />;
  } catch (error) {
    console.log(error);
  }
}
