'use client';

import { Box, Typography } from '@mui/material';
//Internal app
import LogoGreen from '%/images/LogoGreen';
import { PurpleLayout } from '@/components';

export default function Loading() {
  return (
    <PurpleLayout>
      <Box sx={{ zIndex: 1, display: 'grid', justifyItems: 'center' }}>
        <LogoGreen />
        <Typography variant="h6" color="white" align="center" width={222}>
          Comprobando transferencia
        </Typography>
      </Box>
    </PurpleLayout>
  );
}
