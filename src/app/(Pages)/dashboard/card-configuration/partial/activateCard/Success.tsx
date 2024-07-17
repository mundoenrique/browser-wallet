'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { sendGTMEvent } from '@next/third-parties/google';
//Internal app
import { useHeadersStore } from '@/store';
import Pet from '%/images/arts/pet-dance.png';
import { fuchsiaBlue } from '@/theme/theme-default';
import { Linking, PurpleLayout } from '@/components';

export default function Success() {
  const host = useHeadersStore((state) => state.host);

  useEffect(() => {
    sendGTMEvent({
      event: 'ga4.trackEvent',
      eventName: 'page_view_ga4',
      eventParams: {
        page_location: `${host}/dashboard/card-configuration/activaTarjetaFisica/operacionExitosa`,
        page_title: 'Yiro :: configuracionTarjeta :: activaTarjetaFisica :: operacionExitosa',
        page_referrer: `${host}/dashboard/card-configuration/activaTarjetaFisica/inicio`,
        section: 'Yiro :: configuracionTarjeta :: activaTarjetaFisica :: operacionExitosa',
        previous_section: 'Yiro :: configuracionTarjeta :: menu',
      },
    });
  }, [host]);

  return (
    <PurpleLayout hidePelca bigModal width="calc(100% - 315px)">
      <Box sx={{ width: { xs: 'auto', sm: 542 }, display: 'grid', justifyItems: 'center', textAlign: 'center', mx: 3 }}>
        <Box mb={11 / 2}>
          <Image src={Pet} height={170} width={195} alt="Error" priority />
        </Box>
        <Stack spacing={3 / 2} mb={4} textAlign="center">
          <Typography variant="subtitle1" color={fuchsiaBlue[50]}>
            Ya tienes tu tarjeta activada
          </Typography>

          <Typography variant="body2" color={fuchsiaBlue[50]}>
            Esta tarjeta remplaza la virtual por lo tanto si tenías pagos recurrentes asociados, tienes que volver a
            asociarlos
          </Typography>
        </Stack>

        <Linking
          href="/dashboard"
          label="Volver al inicio"
          color="white"
          onClick={() => {
            sendGTMEvent({
              event: 'ga4.trackEvent',
              eventName: 'select_content',
              eventParams: {
                content_type: 'boton',
                section: 'Yiro :: configuracionTarjeta :: activaTarjetaFisica :: operacionExitosa',
                previous_section: 'Yiro :: configuracionTarjeta :: menu',
                selected_content: 'Volver al inicio',
                destination_page: `${host}/dashboard/card-configuration/menu`,
              },
            });
          }}
        />
      </Box>
    </PurpleLayout>
  );
}
