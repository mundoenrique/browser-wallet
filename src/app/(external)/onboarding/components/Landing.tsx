'use client';

import Image from 'next/image';
import { Button, Box, Typography } from '@mui/material';
//Internal app
import welcome from '%/images/Stage01.png';
import { stepperStore } from '@/store/volatileStore';
//TODO:poner el logo en responsive
export default function Landing() {
  const { inc }: any = stepperStore();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Image src={welcome} width={360} height={426} alt="animation" priority />
      <Typography variant="subtitle1" sx={{ color: '#7652B8', marginBottom: { xs: '56px', sm: '24px' } }}>
        ¡Obtén tu cuenta Yiro en sólo 4 pasos!
      </Typography>
      <Button
        variant="contained"
        onClick={() => {
          inc();
        }}
        sx={{ width: 320 }}
      >
        ¡Inicia YA!
      </Button>
    </Box>
  );
}
