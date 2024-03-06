'use client';

import Image from 'next/image';
import { Box, Button, Typography, useTheme, useMediaQuery } from '@mui/material';
//Internal app
import { useRegisterStore } from '@/store';
import dniPwa from '%/images/arts/dniPwa.svg';
import dniDesktop from '%/images/arts/dniDesktop.svg';

export default function DniInfo() {
  const theme = useTheme();
  const { dec, inc } = useRegisterStore();
  const match = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
      <Box>
        <Typography variant="subtitle1" align="center" sx={{ mb: 3 }}>
          Ahora es momento de activar tu cuenta
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 3 }}>
          Primero validaremos tu identidad con una foto frontal de tu DNI
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 / 2 }}>
          {match ? (
            <Image src={dniDesktop} height={156} width={224} alt="DNI" />
          ) : (
            <Image src={dniPwa} height={255} width={142} alt="DNI" />
          )}
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 / 2, mt: { sm: 2 }, mb: { xs: 3, sm: 0 } }}>
        <Button
          variant="outlined"
          onClick={() => {
            dec();
          }}
        >
          Anterior
        </Button>
        <Button
          variant="contained"
          type="submit"
          onClick={() => {
            inc();
          }}
        >
          Siguiente
        </Button>
      </Box>
    </Box>
  );
}
