'use client';

import { Backdrop, Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

//Internal app
import Image from 'next/image';
import Logo from '%/images/yiroGreen.svg';
import { stepperStore } from '@/store/volatileStore';

export default function BiometricValidation() {
  const [statusStep, setStatusStep] = useState<number>(0);

  const { dec, inc }: any = stepperStore();

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
          inc();
        });
    })();
  }, []);
  return (
    <>
      <Backdrop
        open={true}
        onClick={() => {}}
        sx={{
          background: `linear-gradient(180deg, #947bd7 0%, #5f3f98 100%)`,
          zIndex: (theme) => theme.zIndex.drawer + 1,
          '&:before': {
            content: `' '`,
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: '-150px',
            backgroundImage: `url('/images/vectorDesktop.svg')`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', width: '250px' }}>
          <Image src={Logo} width={132} height={74} alt="logo" />
          <Typography variant="h6" color={'white'} align="center" sx={{ height: '80px' }}>
            {statusText[statusStep]}
          </Typography>
        </Box>
      </Backdrop>
    </>
  );
}
