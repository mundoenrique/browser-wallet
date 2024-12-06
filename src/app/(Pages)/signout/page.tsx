'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
//Internal app
import { useHeadersStore } from '@/store';
import { fuchsiaBlue } from '@/theme/theme-default';
import { PurpleLayout, Linking } from '@/components';
import logoGreenStatic from '%/images/logoGreenStatic.svg';

export default function SignOut() {
  const [url, setUrl] = useState<string>('');
  const backLink = useHeadersStore((state) => state.backLink);

  useEffect(() => {
    const urlRef: any = backLink != '' ? backLink : process.env.NEXT_PUBLIC_ALLOW_ORIGIN;
    setUrl(urlRef);
    sessionStorage.clear();
    localStorage.clear();
  }, [backLink, setUrl]);

  return (
    <PurpleLayout>
      <Box sx={{ width: { xs: 'auto', sm: 542 }, display: 'grid', justifyItems: 'center', textAlign: 'center', mx: 3 }}>
        <Image src={logoGreenStatic} alt="Yiro logo" priority />
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

        {url && <Linking href={url} label="Volver" hidenArrow color="white" underline />}
      </Box>
    </PurpleLayout>
  );
}
