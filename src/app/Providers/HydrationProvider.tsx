'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
//Internal app
import logo from '%/images/pwa/96.png';
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
          height: '100vh',
          bgcolor: 'primary.main',
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
            <Image src={logo} width={300} height={60} alt="Picture of the author" priority />
            <Box sx={{ display: 'flex', m: 2 }}>
              <CircularProgress disableShrink color="inherit" />
            </Box>
          </Box>
        </Box>
      </Box>
    );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        height: '100vh',
        bgcolor: 'primary.main',
      }}
    >
      {children}
    </Box>
  );
}
