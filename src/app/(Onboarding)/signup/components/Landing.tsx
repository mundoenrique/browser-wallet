'use client';

import Image from 'next/image';
import { Button, Box, Typography } from '@mui/material';
//Internal app
import welcome from '%/images/Stage01.png';
import LogoPurple from '%/images/LogoPurple';
import { useSignupStore } from '@/store/volatileStore';

export default function Landing() {
  const { inc }: any = useSignupStore();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: { sm: 'space-between' },
        pb: 3,
        flex: 1,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center' }}>
        <Box sx={{ display: { sm: 'none' } }}>
          <LogoPurple width={71} height={40} />
        </Box>
        <Image src={welcome} width={360} height={426} alt="animation" priority />
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="subtitle1" sx={{ color: '#7652B8', mb: { xs: '56px', sm: '24px' } }}>
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
