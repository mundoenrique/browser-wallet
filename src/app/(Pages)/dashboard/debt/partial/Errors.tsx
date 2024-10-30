'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
//Internal app
import { useDebStore } from '@/store';
import { PurpleLayout } from '@/components';
import { fuchsiaBlue } from '@/theme/theme-default';

export default function ErrorPage() {
  const error = useDebStore((state) => state.error);

  const setView = useDebStore((state) => state.setView);

  const setErrorsParams = () => {
    if (error?.code === '400.00.395') {
      return {
        title: 'Fondos insuficientes',
        description:
          'Lo sentimos, no tienes fondos suficientes para completar esta transacción. Por favor, recarga tu cuenta o elige otro método de pago.',
        iconName: 'notFunds',
      };
    } else {
      return {
        title: '¡Lo sentimos!',
        description:
          'Hubo un problema al completar tu transacción. Por favor, verifica los detalles y asegúrate de que todo esté correcto antes de intentarlo nuevamente.',
        iconName: 'sorry',
      };
    }
  };

  useEffect(() => {
    setErrorsParams();
  }, [error]); //eslint-disable-line

  const title = setErrorsParams().title;
  const description = setErrorsParams().description;
  const iconName = setErrorsParams().iconName || 'sorry';

  return (
    <PurpleLayout hidePelca bigModal width="calc(100% - 315px)">
      <Box sx={{ width: { xs: 'auto', sm: 542 }, display: 'grid', justifyItems: 'center', textAlign: 'center', mx: 3 }}>
        <Box mb={11 / 2}>
          <Image src={`/images/arts/pet-${iconName}.png`} height={170} width={195} alt="Error" priority />
        </Box>
        <Stack spacing={3 / 2} mb={4} textAlign="center">
          <Typography variant="subtitle1" color={fuchsiaBlue[50]}>
            {title}
          </Typography>

          <Typography variant="body2" color={fuchsiaBlue[50]}>
            {description}
          </Typography>
        </Stack>

        <Button
          variant="text"
          onClick={() => setView('DEBT')}
          sx={{ textDecoration: 'underline', fontWeight: '700', color: 'white' }}
        >
          Volver a intentar
        </Button>
      </Box>
    </PurpleLayout>
  );
}
