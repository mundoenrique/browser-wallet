'use client';

import { useEffect } from 'react';
import { Typography } from '@mui/material';
//Internal app
import { ContainerLayout, Linking, Questions } from '@/components';
import { useNavTitleStore, useMenuStore } from '@/store';

export default function Question() {
  const { updateTitle } = useNavTitleStore();
  const { setCurrentItem } = useMenuStore();

  useEffect(() => {
    updateTitle('Preguntas frecuentes');
    setCurrentItem('help');
  }, [updateTitle, setCurrentItem]);

  return (
    <ContainerLayout>
      <Typography
        variant="h6"
        color="primary"
        sx={{ color: 'primary.main', mb: 6, display: { xs: 'none ', md: 'block' }, textAlign: 'center' }}
      >
        Preguntas frecuentes
      </Typography>

      <Linking href="/dashboard/help" label="Volver" adormentStart />

      <Typography variant="body2" mb={2}>
        Selecciona el tema que necesitas
      </Typography>

      <Questions />
    </ContainerLayout>
  );
}
