'use client';

import { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
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

  return (
    <Container>
      {children}
      <Typography
        variant="caption"
        sx={{ opacity: '0.5', position: 'absolute', bottom: 10, right: 10, color: 'white' }}
      >
        V0.8.2
      </Typography>
    </Container>
  );
}
