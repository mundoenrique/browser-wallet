'use client';

import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
//Internal app
import { ContainerLayout, Linking, Questions } from '@/components';
import { useNavTitleStore, useMenuStore } from '@/store';

export default function Question() {
  const { setCurrentItem } = useMenuStore();

  const { updateTitle } = useNavTitleStore();

  useEffect(() => {
    updateTitle('Preguntas frecuentes');
    setCurrentItem('help');
  }, [updateTitle, setCurrentItem]);

  return (
    <ContainerLayout>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          mt: 4,
          minWidth: 360,
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

        <iframe
          src="https://d2wvcq79brjjw2.cloudfront.net/qas/index.html"
          title="question"
          style={{ borderColor: 'transparent', height: '100vh' }}
        ></iframe>
      </Box>
    </ContainerLayout>
  );
}
