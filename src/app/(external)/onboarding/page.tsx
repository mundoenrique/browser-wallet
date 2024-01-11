'use client';

import GradientContainer from '@/components/UI/GradientContainer';
import { Button, Typography } from '@mui/material';

export default function Dashboard() {
  return (
    <GradientContainer>
      <Typography>Onboarding</Typography>
      <Button variant="contained" sx={{ width: 320 }}>
        ¡Inicia YA!
      </Button>
      <Button variant="outlined">¡Inicia YA!</Button>
    </GradientContainer>
  );
}
