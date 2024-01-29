'use client';

import { Box, Button, Typography, useTheme, useMediaQuery } from '@mui/material';

import Image from 'next/image';
//Internal app
import { stepperStore } from '@/store/volatileStore';
import dniDesktop from '%/images/dniDesktop.svg';
import dniPwa from '%/images/dniPwa.svg';
export default function DniInfo() {
  const { dec, inc }: any = stepperStore();
  const theme = useTheme();
  const matcha = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
      <Box>
        <Typography variant="subtitle1" align="center" sx={{ marginBottom: '24px' }}>
          Ahora es momento de activar tu cuenta
        </Typography>
        <Typography variant="body1" align="center" sx={{ marginBottom: '24px' }}>
          Primero validaremos tu identidad con una foto frontal de tu DNI
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
          {matcha ? (
            <Image src={dniDesktop} height={156} width={224} alt="DNI" />
          ) : (
            <Image src={dniPwa} height={255} width={142} alt="DNI" />
          )}
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
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
