import LogoGreen from '%/images/LogoGreen';
import { PurpleLayout } from '@/components';

export default function page({ params }: any) {
  const { user } = params;
  console.log('🚀 ~ page ~ user:', user);

  return (
    <PurpleLayout>
      <LogoGreen />
    </PurpleLayout>
  );
}
