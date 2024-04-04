//Internal app
import LogoGreen from '%/images/LogoGreen';
import { PurpleLayout } from '@/components';
import ValidateUser from '../partial/ValidateUser';
export default async function page({ params }: any) {
  const { user } = params;

  console.log('🚀 ~ page ~ user:', user);

  return (
    <>
      <ValidateUser userId={user} />
      <PurpleLayout>
        <LogoGreen />
      </PurpleLayout>
    </>
  );
}
