'use client';

import { useEffect } from 'react';
//Internal app
import { ContainerLayout, Terms } from '@/components';
import { useNavTitleStore, useMenuStore } from '@/store';

export default function Legal() {
  const { updateTitle } = useNavTitleStore();
  const { setCurrentItem } = useMenuStore();

  useEffect(() => {
    updateTitle('Términos y condiciones');
    setCurrentItem('terms');
  }, [updateTitle, setCurrentItem]);

  return (
    <ContainerLayout fullWidth>
      <Terms />
    </ContainerLayout>
  );
}
