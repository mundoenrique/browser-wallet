'use client';

import { useRouter } from 'next/navigation';

//Internal app
import LogoGreen from '%/images/LogoGreen';
import { Box, Stack, Typography } from '@mui/material';
import { PurpleLayout } from '@/components';
import Linking from '@/components/navigation/Linking';
import { fuchsiaBlue } from '@/theme/theme-default';
import { useActiveAppStore } from '@/store';
import { useEffect } from 'react';


export default function signOut() {
  const router = useRouter();

  const setActiveApp = useActiveAppStore((state) => state.setActiveApp);
  const setinitAccess = useActiveAppStore((state) => state.setinitAccess);

  useEffect(() => {
    setActiveApp(false)
    setinitAccess(false)
  })

  return <PurpleLayout>
    <Box sx={{ width: { xs: 'auto', sm: 542 }, display: 'grid', justifyItems: 'center', textAlign: 'center', mx: 3 }}>
        <LogoGreen />
        <Stack spacing={3 / 2} mt={2} mb={3}>
          <Box>
            <Typography variant="subtitle1" color={fuchsiaBlue[50]}>
              Su sesión ha finalizado.
            </Typography>
          </Box>
          <Typography variant="body2" color={fuchsiaBlue[50]} textAlign="left">
            vuelve a iniciar sesion desde tu empresa
          </Typography>
        </Stack>

        <Linking href="" label="Volver" hidenArrow color="white" underline onClick={() => router.back()} />
      </Box>
</PurpleLayout>
}
