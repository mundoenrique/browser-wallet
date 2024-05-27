//Internal app
import DataUser from './partial/DataUser';
import { NotFoundError } from '@/components';
import { delRedis, getRedis } from '@/utils/redis';

export default async function UserPage({ params }: any) {
  const { user } = params;

  const userData = await getRedis(`identify:${user}`)
  await delRedis(`identify:${user}`)

  if (!userData) return <NotFoundError code={404} />;

  return <DataUser user={userData} />;
}
