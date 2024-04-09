'use client';

import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
//Internal app
import { PurpleLayout } from '@/components';
import LogoGreen from '%/images/LogoGreen';

interface dataUser {
  user: string;
}

export default function DataUser(user: dataUser) {
  console.log(user);
  const { replace } = useRouter();
  // copíar código de page principal de aquí en adelante y redirecioar de acuerdo al resultado de la integración
  setTimeout(() => {
    replace('/signin');
  }, 2000);

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
