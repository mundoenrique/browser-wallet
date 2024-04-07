'use client';

import { useSearchParams } from 'next/navigation';
//Internal app
import { PurpleLayout } from '@/components';
import LogoGreen from '%/images/LogoGreen';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';

export default function UserPage() {
  const searchParams = useSearchParams();

  const consultantCode = searchParams?.get('consultantCode');
  const countryCode = searchParams?.get('countryCode');

  return (
    <PurpleLayout>
      <Box sx={{ zIndex: 1, display: 'grid', justifyItems: 'center', gap: 3 }}>
        <LogoGreen />
        <Typography variant="h6" color="white" align="center" sx={{ width: 222 }}>
          Estamos verificando tu información
        </Typography>
      </Box>
    </PurpleLayout>
  );
}
