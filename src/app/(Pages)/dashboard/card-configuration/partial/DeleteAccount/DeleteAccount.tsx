'use client';

import { useEffect } from 'react';
import { Button, Typography, Stack } from '@mui/material';
import { sendGTMEvent } from '@next/third-parties/google';
import SadnessIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';
//Internal app
import { ContainerLayout, HandleCard, Linking } from '@/components';
import { useNavTitleStore, useConfigCardStore, useHeadersStore } from '@/store';

export default function DeleteAccount() {
  const { backLink } = useHeadersStore();

  const { updateTitle } = useNavTitleStore();

  const { updatePage } = useConfigCardStore();

  const host = useHeadersStore((state) => state.host);

  useEffect(() => {
    updateTitle('Eliminar cuenta');
  }, [updateTitle]);

  useEffect(() => {
    sendGTMEvent({
      event: 'ga4.trackEvent',
      eventName: 'page_view_ga4',
      eventParams: {
        page_location: `${host}/dashboard/card-configuration/eliminarCuenta`,
        page_title: 'Yiro :: configuracionTarjeta :: eliminarCuenta',
        page_referrer: `${host}/dashboard/card-configuration/menu`,
        section: 'Yiro :: configuracionTarjeta :: eliminarCuenta',
        previous_section: 'Yiro :: configuracionTarjeta :: menu',
      },
    });
  }, [host]);

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
            sendGTMEvent({
              event: 'ga4.trackEvent',
              eventName: 'select_content',
              eventParams: {
                content_type: 'boton',
                section: 'Yiro :: configuracionTarjeta :: eliminarCuenta',
                previous_section: 'Yiro :: configuracionTarjeta :: menu',
                selected_content: 'Continuar',
                destination_page: `${backLink}`,
              },
            });
          }}
        >
          Continuar
        </Button>
      </Stack>
    </ContainerLayout>
  );
}
