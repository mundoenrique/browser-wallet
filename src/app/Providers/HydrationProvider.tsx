'use client';

import { useEffect, useState } from 'react';
import { Box, CircularProgress, Container } from '@mui/material';
//Internal app
import LogoGreen from '%/images/LogoGreen';
import { ChildrenProps } from '@/interfaces';

export default function HydrationProvider({ children }: ChildrenProps) {
  const [isHydrated, setIsHydrated] = useState(true);

  useEffect(() => {
    setIsHydrated(false);
  }, []);

  if (isHydrated)
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          minHeight: '100vh',
        }}
      >
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
            <LogoGreen />
            <Box sx={{ display: 'flex', m: 2 }}>
              <CircularProgress disableShrink color="inherit" />
            </Box>
          </Box>
        </Box>
      </Box>
    );

  return <Container>{children}</Container>;
}
