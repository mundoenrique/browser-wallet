'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography } from '@mui/material';
//Internal app
import { useRegisterStore } from '@/store';
import LogoGreen from '%/images/LogoGreen';
import { PurpleLayout } from '@/components';

export default function Ending() {
  const { replace } = useRouter();
  const { setShowHeader } = useRegisterStore();

  //TODO:timeEvent es de implementacion temporal
  const timeEvent = (time: number) =>
    new Promise((resolve) => {
      setTimeout(() => resolve(true), time);
    });

  useEffect(() => {
    setShowHeader(false);
    (async () => {
      timeEvent(3000)
        .then(() => {
          return timeEvent(1500);
        })
        .then(() => {
          replace('/signin');
        });
    })();
  }, [setShowHeader, replace]);

  return (
    <PurpleLayout>
      <Box sx={{ zIndex: 1, display: 'grid', justifyItems: 'center' }}>
        <LogoGreen />
        <Typography fontSize={34} align="center" color="white" fontWeight={700} width={250} lineHeight="44px">
          ¡Felicidades!
          <br />
          Ya eres parte de Yiro
        </Typography>
      </Box>
    </PurpleLayout>
  );
}
