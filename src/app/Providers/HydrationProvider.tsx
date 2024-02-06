'use client';

import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
//Internal app
import LogoGreen from '%/images/LogoGreen';
import { PurpleLayout } from '@/components';
import { ChildrenProps } from '@/interfaces';

export default function HydrationProvider({ children }: ChildrenProps) {
  const [isHydrated, setIsHydrated] = useState(true);

  useEffect(() => {
    setIsHydrated(false);
  }, []);

  if (isHydrated)
    return (
      <PurpleLayout>
        <LogoGreen />
      </PurpleLayout>
    );

  return <Container>{children}</Container>;
}
