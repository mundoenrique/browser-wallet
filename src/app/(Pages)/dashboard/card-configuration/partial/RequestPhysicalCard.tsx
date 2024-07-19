'use client';

import { useEffect, useState } from 'react';
import { sendGTMEvent } from '@next/third-parties/google';
import { Avatar, Box, Button, Card, Stack, Typography } from '@mui/material';
//Internal app
import { api } from '@/utils/api';
import { fuchsiaBlue } from '@/theme/theme-default';
import { ContainerLayout, Linking, ModalResponsive } from '@/components';
import { useConfigCardStore, useNavTitleStore, useUserStore, useUiStore, useHeadersStore } from '@/store';

export default function RequestPhysicalCard() {
  const updateTitle = useNavTitleStore((state) => state.updateTitle);

  const host = useHeadersStore((state) => state.host);

  const { userId } = useUserStore((state) => state.user);

  const setModalError = useUiStore((state) => state.setModalError);

  const loadingScreen = useUiStore((state) => state.loadingScreen);

  const updatePage = useConfigCardStore((state) => state.updatePage);

  const setLoadingScreen = useUiStore((state) => state.setLoadingScreen);

  const setCardProperties = useConfigCardStore((state) => state.setCardProperties);

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    updateTitle('Solicitar tarjeta física');
  }, [updateTitle]);

  const handleSendCard = async () => {
    setLoadingScreen(true);
    const payload = {
      userId: userId,
    };
    api
      .post(`/cards/users/physicalcard`, { payload })
      .then(() => {
        setOpen(!open);
      })
      .catch((e) => {
        setModalError({ error: e });
      })
      .finally(() => {
        setLoadingScreen(false);
      });
  };

  useEffect(() => {
    sendGTMEvent({
      event: 'ga4.trackEvent',
      eventName: 'page_view_ga4',
      eventParams: {
        page_location: `${host}/dashboard/card-configuration/solicitarTarjetaFisica`,
        page_title: 'Yiro :: configuracionTarjeta :: solicitarTarjetaFisica',
        page_referrer: `${host}/dashboard/card-configuration/menu`,
        section: 'Yiro :: configuracionTarjeta :: solicitarTarjetaFisica',
        previous_section: 'Yiro :: configuracionTarjeta :: menu',
      },
    });
  }, [host]);

  return (
    <>
      <ContainerLayout>
        <Typography
          variant="h6"
          color="primary"
          sx={{ color: 'primary.main', mb: 6, display: { xs: 'none ', md: 'block' }, textAlign: 'center' }}
        >
          Solicitar tarjeta física
        </Typography>

        <Linking
          href="#"
          onClick={() => {
            updatePage('main');
          }}
          label="Volver"
          adormentStart
        />

        <Typography variant="body2" mb={3}>
          Haz click en el botón “Solicitar tarjeta” y te la enviaremos en tu siguiente pedido.
        </Typography>
        <Typography variant="body2" mb={2}>
          El proceso es el siguiente:
        </Typography>

        <Card sx={{ boxShadow: 0, p: 1, mb: 3 }}>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex' }}>
              <Avatar sx={{ bgcolor: fuchsiaBlue[200], width: 26, height: 26, mr: 1 }}>
                <Typography color="primary" variant="caption">
                  1
                </Typography>
              </Avatar>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle2">Solicitar la tarjeta</Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex' }}>
              <Avatar sx={{ bgcolor: fuchsiaBlue[200], width: 26, height: 26, mr: 1 }}>
                <Typography color="primary" variant="caption">
                  2
                </Typography>
              </Avatar>
              <Box sx={{ display: 'grid', alignItems: 'center' }}>
                <Typography variant="subtitle2">La recibirás en tu siguiente pedido</Typography>
                <Typography variant="caption">La tarjeta te llegará dentro de tu caja de pedido.</Typography>
                <Typography variant="caption">
                  No te preocupes por temas de seguridad, pues no tendrá ningún valor hasta que la actives.
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex' }}>
              <Avatar sx={{ bgcolor: fuchsiaBlue[200], width: 26, height: 26, mr: 1 }}>
                <Typography color="primary" variant="caption">
                  3
                </Typography>
              </Avatar>
              <Box sx={{ display: 'grid', alignItems: 'center' }}>
                <Typography variant="subtitle2">Activar la tarjeta</Typography>
                <Typography variant="caption">
                  Junto a la tarjeta, te enviaremos las instrucciones para que la actives y empieces a disfrutarla.
                </Typography>
              </Box>
            </Box>
          </Stack>
        </Card>

        <Button variant="contained" onClick={handleSendCard} disabled={loadingScreen}>
          Solicitar tarjeta
        </Button>
      </ContainerLayout>

      <ModalResponsive
        open={open}
        handleClose={() => {
          setOpen(false);
          updatePage('main');
        }}
      >
        <Typography variant="subtitle1">💳 ¡Listo! Te enviaremos tu tarjeta en el siguiente pedido.</Typography>
      </ModalResponsive>
    </>
  );
}
