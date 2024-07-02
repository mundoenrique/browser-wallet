'use client';

import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
//Internal app
import { useHeadersStore } from '@/store';
import LogoGreen from '%/images/LogoGreen';
import { PurpleLayout } from '@/components';
import { sendGTMEvent } from '@next/third-parties/google';

export default function Loading() {
  const host = useHeadersStore((state) => state.host);

  useEffect(() => {
    sendGTMEvent({
      event: 'ga4.trackEvent',
      eventName: 'page_view_ga4',
      eventParams: {
        page_location: `${host}/dashboard/transfer`,
        page_title: 'Yiro :: transferencia :: verificando',
        page_referrer: `${host}/dashboard/transfer`,
        section: 'Yiro :: transferencia :: verificando',
        previous_section: 'Yiro :: transferencia :: monto',
      },
    });
  }, [host]);

  return (
    <PurpleLayout bigModal>
      <Box sx={{ zIndex: 1, display: 'grid', justifyItems: 'center' }}>
        <LogoGreen />
        <Typography variant="h6" color="white" align="center" width={222}>
          Comprobando transferencia
        </Typography>
      </Box>
    </PurpleLayout>
  );
}
