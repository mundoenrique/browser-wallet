import { headers } from 'next/headers';
//Internal app
import DataUser from './partial/DataUser';
import { NotFoundError } from '@/components';
import { delRedis, getRedis } from '@/utils/redis';

export default async function UserPage({ params, searchParams }: any) {
  const headersList = headers();
  const { user } = params;
  const sessionId = searchParams?.sessionId || '';
  const clientId = searchParams?.clientId || '';

  const protocol = headersList.get('x-forwarded-proto');
  const referer = headersList.get('referer') || '';
  const host = headersList.get('host');

  const userData = await getRedis(`identify:${user}`)
  await delRedis(`identify:${user}`)

  if (!userData) return <NotFoundError code={404} />;

  return <DataUser user={userData} referer={`${referer}?sessionId=${sessionId}&clientId=${clientId}`} host={`${protocol}://${host}`} />;
}
