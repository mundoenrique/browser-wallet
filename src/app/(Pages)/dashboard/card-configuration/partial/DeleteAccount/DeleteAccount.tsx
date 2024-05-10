'use client';

import { useEffect } from 'react';
import { Button, Typography, Stack } from '@mui/material';
import SadnessIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';
//Internal app
import { useNavTitleStore, useConfigCardStore } from '@/store';
import { ContainerLayout, HandleCard, Linking } from '@/components';

export default function DeleteAccount() {
  const { updateTitle } = useNavTitleStore();
  const { updatePage } = useConfigCardStore();

  useEffect(() => {
    updateTitle('Eliminar cuenta');
  }, [updateTitle]);

  return (
    <ContainerLayout>
      <Typography
        variant="h6"
        color="primary"
        sx={{ color: 'primary.main', mb: 6, display: { xs: 'none ', md: 'block' }, textAlign: 'center' }}
      >
        Eliminar cuenta
      </Typography>

      <Linking
        onClick={() => {
          updatePage('main');
        }}
        href="#"
        label="Volver"
        adormentStart
      />

      <Stack spacing={3}>
        <HandleCard avatar={<SadnessIcon color="primary" sx={{ p: 1 / 2 }} />}>
          <Typography variant="subtitle2">Nos apena verte partir</Typography>
          <Typography variant="caption" mb={2}>
            Antes de cerrar tu cuenta, asegúrate de que el saldo sea $0. Una vez eliminada, no podrás realizar más
            operaciones.
          </Typography>
          <Typography variant="caption">Ten en cuenta que esta decisión es irreversible.</Typography>
        </HandleCard>

        <Button
          variant="contained"
          onClick={() => {
            updatePage('survey');
          }}
        >
          Continuar
        </Button>
      </Stack>
    </ContainerLayout>
  );
}
