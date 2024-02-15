'use client';

import { useEffect } from 'react';
import { Button, Stack, Typography } from '@mui/material';
//Internal app
import { CardIcons } from '%/Icons';
import { useNavTitleStore } from '@/store';
import { ContainerLayout, HandleCard, Linking } from '@/components';

export default function ActivatePhysicalCard() {
  const { updateTitle }: any = useNavTitleStore();

  useEffect(() => {
    updateTitle('Activación de tarjeta física');
  }, []);

  return (
    <ContainerLayout>
      <Typography
        variant="h6"
        color="primary"
        sx={{ color: 'primary.main', mb: 6, display: { xs: 'none ', md: 'block' }, textAlign: 'center' }}
      >
        Activación de tarjeta física
      </Typography>

      <Linking href="/dashboard/help" label="Volver" />

      <Typography variant="body2" mb={3}>
        Para activar tu tarjeta
      </Typography>

      <Stack spacing={3}>
        <HandleCard avatar={<CardIcons color="primary" sx={{ p: 1 / 2 }} />}>
          <Typography variant="subtitle2">Escanea el código</Typography>
          <Typography variant="caption">Escanea el código QR presente en el sobre para activarla.</Typography>
        </HandleCard>

        <Button variant="contained">Escanear Código QR</Button>
      </Stack>
    </ContainerLayout>
  );
}
