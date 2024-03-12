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
      // <Box
      //   sx={{
      //     display: 'flex',
      //     justifyContent: 'center',
      //     alignItems: 'center',
      //     height: '100vh',
      //     zIndex: (theme) => theme.zIndex.drawer + 1,
      //     backgroundColor: '#5F3F9850',
      //   }}
      // >
      //   <Box sx={{ display: 'grid', justifyItems: 'center' }}>
      //     <LogoPurple />
      //     <CircularProgress thickness={5} color="primary" />
      //   </Box>
      // </Box>
      <PurpleLayout>
        <LogoGreen />
      </PurpleLayout>
    );

  return <Container>{children}</Container>;
}
