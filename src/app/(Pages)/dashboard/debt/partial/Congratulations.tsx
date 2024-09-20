'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Box, Button, Stack, Typography } from '@mui/material';
//Internal app
import { PurpleLayout } from '@/components';
import { fuchsiaBlue } from '@/theme/theme-default';

export default function Congratulations() {
  const { push } = useRouter();

  return (
    <PurpleLayout hidePelca bigModal width="calc(100% - 315px)">
      <Box sx={{ width: { xs: 'auto', sm: 542 }, display: 'grid', justifyItems: 'center', textAlign: 'center', mx: 3 }}>
        <Box mb={11 / 2}>
          <Image src={`/images/arts/pet-dance.png`} height={170} width={195} alt="Error" priority />
        </Box>
        <Stack spacing={3 / 2} mb={4} textAlign="center">
          <Typography variant="subtitle1" color={fuchsiaBlue[50]}>
            ¡Felicidades!
          </Typography>

          <Typography variant="body2" color={fuchsiaBlue[50]}>
            No tienes deudad pendientes.
          </Typography>
        </Stack>

        <Button
          variant="text"
          onClick={() => push('/dashboard')}
          sx={{ textDecoration: 'underline', fontWeight: '700', color: 'white' }}
        >
          Volver al inicio
        </Button>
      </Box>
    </PurpleLayout>
  );
}
