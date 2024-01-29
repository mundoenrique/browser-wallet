'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography } from '@mui/material';

//Internal app
import LogoGreen from '%/images/LogoGreen';
import { PurpleLayout } from '@/components';

export default function BiometricValidation() {
  const router = useRouter();
  const [statusStep, setStatusStep] = useState<number>(0);

  //TODO:timeEvent es de implementacion temporal
  const timeEvent = (time: number) =>
    new Promise((resolve) => {
      setTimeout(() => resolve(true), time);
    });

  const statusText = ['Estamos verificando tu información', 'Verificación correcta'];

  useEffect(() => {
    (async () => {
      timeEvent(3000)
        .then(() => {
          setStatusStep(statusStep + 1);
          return timeEvent(1500);
        })
        .then(() => {
          router.push('/signin');
        });
    })();
  }, []);

  return (
    <PurpleLayout>
      <Box sx={{ zIndex: 1, display: 'grid', justifyItems: 'center' }}>
        <LogoGreen />
        <Typography variant="h6" color="white" align="center" sx={{ height: '80px' }}>
          {statusText[statusStep]}
        </Typography>
      </Box>
    </PurpleLayout>
  );
}
