'use client';

import { useEffect, useState } from 'react';
import Cookie from "js-cookie";
//Internal app
import LogoGreen from '%/images/LogoGreen';
import { Box, Stack, Typography } from '@mui/material';
import { PurpleLayout } from '@/components';
import Linking from '@/components/navigation/Linking';
import { fuchsiaBlue } from '@/theme/theme-default';
import { useHeadersStore } from '@/store';
import { SESSION_ID } from '@/utils/constants';


export default function signOut() {

  const [url, setUrl] = useState<string>('');
  const backLink = useHeadersStore((state) => state.backLink);

  useEffect(() => {
    const url: any = (backLink != '') ? backLink : process.env.NEXT_PUBLIC_ALLOW_ORIGIN;
    setUrl(url);
    sessionStorage.clear();
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
            Vuelve a iniciar sesion desde somos Belcorp
          </Typography>
        </Stack>

      <Linking href={url} label="Volver" hidenArrow color="white" underline />
      </Box>
</PurpleLayout>
}
