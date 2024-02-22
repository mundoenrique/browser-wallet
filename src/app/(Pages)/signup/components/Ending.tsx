'use client';

import { useEffect } from 'react';
import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';
//Internal app
import { useRegisterStore } from '@/store';
import LogoGreen from '%/images/LogoGreen';
import { PurpleLayout } from '@/components';

export default function Ending() {
  const { setShowHeader } = useRegisterStore();
  const { push } = useRouter();

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
          push('/signin');
        });
    })();
  }, [setShowHeader, push]);

  return (
    <PurpleLayout>
      <Box sx={{ zIndex: 1, display: 'grid', justifyItems: 'center' }}>
        <LogoGreen />
      </Box>
    </PurpleLayout>
  );
}
