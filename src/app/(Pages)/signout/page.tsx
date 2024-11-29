'use client';

import { Box, Stack, Typography } from '@mui/material';
//Internal app
import { api } from '@/utils/api';
import LogoGreen from '%/images/LogoGreen';
import { fuchsiaBlue } from '@/theme/theme-default';
import { PurpleLayout, Linking } from '@/components';
import { useHeadersStore, useKeyStore } from '@/store';

export default function SignOut() {
  const backLink = useHeadersStore((state) => state.backLink);

  const jwePublicKey = useKeyStore((state) => state.jwePublicKey);

  const returnBelcorp = async () => {
    sessionStorage.clear();
    localStorage.clear();
    await api.delete('/redis', { data: { jwePublicKey, delParam: 'jwt', removeRedis: true } });

    setTimeout(() => {
      window.open(backLink != '' ? backLink : (process.env.NEXT_PUBLIC_ALLOW_ORIGIN as string), '_self');
    }, 1000);
  };

  return (
    <PurpleLayout>
      <Box sx={{ width: { xs: 'auto', sm: 542 }, display: 'grid', justifyItems: 'center', textAlign: 'center', mx: 3 }}>
        <LogoGreen />
        <Stack spacing={3 / 2} mt={2} mb={3}>
          <Box>
            <Typography variant="subtitle1" color={fuchsiaBlue[50]}>
              Su sesión ha finalizado.
            </Typography>
          </Box>
          <Typography variant="body2" color={fuchsiaBlue[50]} textAlign="left">
            Vuelve a iniciar sesion desde Somos Belcorp
          </Typography>
        </Stack>

        <Linking href={''} label="Volver" hidenArrow color="white" underline onClick={returnBelcorp} />
      </Box>
    </PurpleLayout>
  );
}
