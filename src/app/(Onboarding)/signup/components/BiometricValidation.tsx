'use client';

import { useEffect, useState, useRef } from 'react';
import { Box, Typography } from '@mui/material';

//Internal app
import LogoGreen from '%/images/LogoGreen';
import { PurpleLayout } from '@/components';
import { useSignupStore } from '@/store/signupStore';

export default function BiometricValidation() {
  const { updateStep, setShowHeader } = useSignupStore();
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
  }, [statusStep]);

  useEffect(() => {
    setShowHeader(false);
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
