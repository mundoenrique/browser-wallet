'use client';

import { Box, Button, Typography, useTheme, useMediaQuery } from '@mui/material';
import Image from 'next/image';
//Internal app
import { useSignupStore } from '@/store/volatileStore';
import selfieDesktop from '%/images/selfieDesktop.svg';
import selfiePwa from '%/images/selfiePwa.svg';
export default function SelfieInfo() {
  const { dec, inc }: any = useSignupStore();
  const theme = useTheme();
  const matcha = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
      <Box sx={{ marginBottom: { sm: '24px' }, width: '100%' }}>
        <Typography variant="subtitle1" align="center" sx={{ marginBottom: '24px' }}>
          Ahora es momento de activar tu cuenta
        </Typography>
        <Typography variant="body1" align="center" sx={{ marginBottom: '24px' }}>
          Tómate una selfie para terminar la validación del DNI
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
          {matcha ? (
            <Image src={selfieDesktop} height={156} width={224} alt="DNI" />
          ) : (
            <Image src={selfiePwa} height={261} width={148} alt="DNI" />
          )}
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '12px', mt: { sm: 2 }, mb: { xs: 3, sm: 0 } }}>
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
