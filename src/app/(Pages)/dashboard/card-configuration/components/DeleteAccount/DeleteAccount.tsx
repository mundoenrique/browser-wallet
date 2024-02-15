'use client';

import { useEffect } from 'react';
import { Button, Typography, Stack } from '@mui/material';
import SadnessIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';
//Internal app
import { useNavTitleStore } from '@/store';
import { ContainerLayout, HandleCard, Linking } from '@/components';

export default function DeleteAccount() {
  const { updateTitle }: any = useNavTitleStore();

  useEffect(() => {
    updateTitle('Eliminar cuenta');
  }, []);

  return (
    <ContainerLayout>
      <Typography
        variant="h6"
        color="primary"
        sx={{ color: 'primary.main', mb: 6, display: { xs: 'none ', md: 'block' }, textAlign: 'center' }}
      >
        Eliminar cuenta
      </Typography>

      <Linking href="#" label="Volver" />

      <Stack spacing={3}>
        <HandleCard avatar={<SadnessIcon color="primary" sx={{ p: 1 / 2 }} />}>
          <Typography variant="subtitle2">Nos apena verte partir</Typography>
          <Typography variant="caption" mb={2}>
            Antes de cerrar tu cuenta, asegúrate de que el saldo sea $0. Una vez eliminada, no podrás realizar más
            operaciones.
          </Typography>
          <Typography variant="caption">Ten en cuenta que esta decisión es irreversible.</Typography>
        </HandleCard>

        <Button variant="contained">Eliminar cuenta</Button>
      </Stack>
    </ContainerLayout>
  );
}
