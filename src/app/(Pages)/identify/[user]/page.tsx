import { cookies } from 'next/headers';
//Internal app
import LogoGreen from '%/images/LogoGreen';
import { NotFoundError, PurpleLayout } from '@/components';

export default function page({ params }: any) {
  const { user } = params;
  const userData = cookies().get(`${user}`)?.value.split('-');

  if (!userData) {
    return <NotFoundError code={404} />;
  }

  return (
    <PurpleLayout>
      <LogoGreen />
    </PurpleLayout>
  );
}
