'use client';

import { useEffect, useState } from 'react';
//Internal app
import LogoGreen from '%/images/LogoGreen';
import { Box, Stack, Typography } from '@mui/material';
import { PurpleLayout } from '@/components';
import Linking from '@/components/navigation/Linking';
import { fuchsiaBlue } from '@/theme/theme-default';
import { useHeadersStore } from '@/store';

export default function SignOut() {

  const [url, setUrl] = useState<string>('');
  const backLink = useHeadersStore((state) => state.backLink);

  useEffect(() => {
    const urlRef: any = (backLink != '') ? backLink : process.env.NEXT_PUBLIC_ALLOW_ORIGIN;
    setUrl(urlRef);
    sessionStorage.clear();
  }, [backLink, setUrl]);

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
            Vuelve a iniciar sesion desde Somos Belcorp
          </Typography>
        </Stack>

      <Linking href={url} label="Volver" hidenArrow color="white" underline />
      </Box>
</PurpleLayout>
}
