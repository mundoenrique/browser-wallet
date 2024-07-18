'use client';

import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { sendGTMEvent } from '@next/third-parties/google';
//Internal app
import { ContainerLayout, Linking } from '@/components';
import { useNavTitleStore, useMenuStore, useHeadersStore } from '@/store';

export default function Question() {
  const { setCurrentItem } = useMenuStore();

  const { updateTitle } = useNavTitleStore();

  const host = useHeadersStore((state) => state.host);

  useEffect(() => {
    updateTitle('Preguntas frecuentes');
    setCurrentItem('help');
  }, [updateTitle, setCurrentItem]);

  useEffect(() => {
    sendGTMEvent({
      event: 'ga4.trackEvent',
      eventName: 'page_view_ga4',
      eventParams: {
        page_location: `${host}/dashboard/help`,
        page_title: 'Yiro :: ayuda :: preguntas frecuentes',
        page_referrer: `${host}/dashboard`,
        section: 'Yiro :: ayuda :: Preguntas frecuentes',
        previous_section: 'dashboard',
      },
    });
  }, [host]);

  return (
    <ContainerLayout>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          mt: 20,
          minWidth: { md: '360px', xs: 'inherit' },
        }}
      >
        <Typography
          variant="h6"
          color="primary"
          sx={{ color: 'primary.main', mb: 6, display: { xs: 'none ', md: 'block' }, textAlign: 'center' }}
        >
          Preguntas frecuentes
        </Typography>

        <Linking href="/dashboard/help" label="Volver" adormentStart mb={0} />
        <Box
          component={'iframe'}
          sx={{ borderColor: 'transparent', height: { md: 1200, xs: '100vh' } }}
          src="https://d2wvcq79brjjw2.cloudfront.net/qas/index.html"
          title="question"
        />
      </Box>
    </ContainerLayout>
  );
}
