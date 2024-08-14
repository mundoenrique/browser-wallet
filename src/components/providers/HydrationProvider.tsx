'use client';

import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
//Internal app
import LogoGreen from '%/images/LogoGreen';
import { PurpleLayout } from '@/components';
import { ChildrenProps } from '@/interfaces';

/**
 * Provider showing a load while hydrating the application.
 *
 * @param children - Children element.
 */
export default function HydrationProvider({ children }: ChildrenProps): JSX.Element {
  const [isHydrated, setIsHydrated] = useState<boolean>(true);

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
