'use client';

import Image from 'next/image';
import { Box, Stack, Typography } from '@mui/material';
//Internal app
import Pet from '%/images/arts/pet-dance.png';
import { fuchsiaBlue } from '@/theme/theme-default';
import { Linking, PurpleLayout } from '@/components';

export default function Success() {
  return (
    <PurpleLayout hidePelca bigModal width="calc(100% - 315px)">
      <Box sx={{ width: { xs: 'auto', sm: 542 }, display: 'grid', justifyItems: 'center', textAlign: 'center', mx: 3 }}>
        <Box mb={11 / 2}>
          <Image src={Pet} height={170} width={195} alt="Error" priority />
        </Box>
        <Stack spacing={3 / 2} mb={4} textAlign="center">
          <Typography variant="subtitle1" color={fuchsiaBlue[50]}>
            Ya tienes tu tarjeta activada
          </Typography>

          <Typography variant="body2" color={fuchsiaBlue[50]}>
            Esta tarjeta remplaza la virtual por lo tanto si tenías pagos recurrentes asociados, tienes que volver a
            asociarlos
          </Typography>
        </Stack>

        <Linking href="/dashboard" label="Volver al inicio" color="white" />
      </Box>
    </PurpleLayout>
  );
}
