//Internal app
import LogoGreen from '%/images/LogoGreen';
import { PurpleLayout } from '@/components';
import Identity from '../partial/Identity';
export default async function page({ params }: any) {
  const { user } = params;

  console.log('🚀 ~ page ~ user:', user);

  return (
    <>
      <Identity userId={user} />
      <PurpleLayout>
        <LogoGreen />
      </PurpleLayout>
    </>
  );
}
