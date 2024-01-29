'use client';

import Image from 'next/image';
import { Button, Box, Typography } from '@mui/material';
//Internal app
import welcome from '%/images/arts/Stage01.png';
import LogoPurple from '%/images/LogoPurple';
import { stepperStore } from '@/store/volatileStore';

export default function Landing() {
  const { inc }: any = stepperStore();

  return (
    <Box
      sx={{
        minHeight: { sm: 738 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: { sm: 'space-between' },
        pb: { sm: 3 },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: { sm: 4 } }}>
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
