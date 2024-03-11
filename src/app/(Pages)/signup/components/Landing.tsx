'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { Button, Box, Typography } from '@mui/material';
//Internal app
import { useRegisterStore } from '@/store';
import LogoPurple from '%/images/LogoPurple';
import welcome from '%/images/arts/Stage01.png';
import { fuchsiaBlue } from '@/theme/theme-default';
import { WelcomeAnimationProps } from '@/interfaces';
import animation1 from '%/images/pwa/animation1.png';
import animation2 from '%/images/pwa/animation2.png';
import animation3 from '%/images/pwa/animation3.png';

const animationState = [
  {
    src: animation1,
    text: (
      <>
        Yiro, tu billetera <br /> electrónica
      </>
    ),
  },
  {
    src: animation2,
    text: (
      <>
        ¡Paga y cobra fácil <br /> con Yiro!
      </>
    ),
  },
  {
    src: animation3,
    text: (
      <>
        Organiza tus
        <br /> finanzas y tu negocio
      </>
    ),
  },
];

const WelcomeAnimation = ({ animation, text }: WelcomeAnimationProps) => {
  return (
    <Box>
      <Image src={animation} width={468} height={291} alt="animation" priority />
      <Typography
        sx={{
          color: fuchsiaBlue[800],
          mb: { xs: 7, sm: 3 },
          fontSize: 28,
          fontWeight: 700,
          textAlign: 'center',
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default function Landing() {
  const { inc, setShowHeader } = useRegisterStore();

  useEffect(() => {
    setShowHeader(true);
  }, [setShowHeader]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 'auto',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ display: { sm: 'none' } }}>
          <LogoPurple width={71} height={40} />
        </Box>
        <Image src={welcome} width={360} height={426} alt="animation" priority />
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="subtitle1" sx={{ color: fuchsiaBlue[800], mb: { xs: 7, sm: 3 } }}>
          ¡Obtén tu cuenta Yiro en sólo 4 pasos!
        </Typography>
        <Button
          variant="contained"
          sx={{ width: 320 }}
          onClick={() => {
            inc();
          }}
        >
          ¡Inicia YA!
        </Button>
      </Box>
    </Box>
  );
}
