'use client';

import { Box, Typography } from '@mui/material';
import { useEffect, useState, useRef } from 'react';
//Internal app
import { useRegisterStore } from '@/store';
import LogoGreen from '%/images/LogoGreen';
import { PurpleLayout } from '@/components';

export default function BiometricValidation() {
  const { updateStep, setShowHeader } = useRegisterStore();
  const [statusStep, setStatusStep] = useState<number>(0);
  const initial = useRef(false);

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
          !initial.current && updateStep(10);
          initial.current = true;
        });
    })();
  }, [statusStep, updateStep]);

  useEffect(() => {
    setShowHeader(false);
  }, [setShowHeader]);

  return (
    <PurpleLayout>
      <Box sx={{ zIndex: 1, display: 'grid', justifyItems: 'center' }}>
        <LogoGreen />
        <Typography variant="h6" color="white" align="center" sx={{ height: 80 }}>
          {statusText[statusStep]}
        </Typography>
      </Box>
    </PurpleLayout>
  );
}
