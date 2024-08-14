'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Typography, Stack, Button } from '@mui/material';
import { sendGTMEvent } from '@next/third-parties/google';
//Internal app
import { api } from '@/utils/api';
import ModalResponsive from './ModalResponsive';
import { useHeadersStore, useUserStore, useUiStore } from '@/store';

export default function ModalCardBundle({ open }: { open: boolean }) {
  const router = useRouter();

  const host = useHeadersStore((state) => state.host);

  const setUser = useUserStore((state) => state.setUser);

  const user = useUserStore((state) => state.user);

  const setModalError = useUiStore((state) => state.setModalError);

  const setLoadingScreen = useUiStore((state) => state.setLoadingScreen);

  const [block, setBlock] = useState<boolean>(false);

  const requestBundledCard = async () => {
    setLoadingScreen(true);
    setBlock(true);
    const payload = {
      userId: user.userId,
    };

    api
      .post('/cards/replacement', payload)
      .then((response) => {
        setUser({ ...user, cardSolutions: { ...user.cardSolutions, status: {}, cardId: response.data.data.cardId } });
      })
      .catch((e) => {
        setModalError({ error: e });
      })
      .finally(() => {
        setLoadingScreen(false);
        setBlock(false);
      });
  };

  return (
    <ModalResponsive
      open={open}
      handleClose={() => null}
      sx={{ '& .Modal-Responsive': { background: 'red' } }}
      disabledClosed
    >
      <Typography variant="subtitle1" mb={3}>
        🚫 Tarjeta Bloqueada
      </Typography>
      <Stack spacing={2} sx={{ textAlign: 'left' }} mb={3}>
        <Typography variant="body2">Tu tarjeta esta bloqueada.</Typography>
        <Typography variant="body2">Además estamos creándote una nueva cuenta Yiro Virtual</Typography>
        <Typography variant="body2">
          No te preocupes conservaras todos los datos de tu cuenta anterior y puedes seguir usando nuestros servicios.
        </Typography>
        <Typography variant="body2">Si quieres una nueva tarjeta física tienes que volver a solicitarla.</Typography>
        <Typography variant="body2">Si tienes afiliado un pago recurrente tienes que volver a generarlo.</Typography>
      </Stack>
      <Button
        variant="contained"
        onClick={async () => {
          await requestBundledCard();
          router.push('/dashboard');
          router.refresh();
          sendGTMEvent({
            event: 'ga4.trackEvent',
            eventName: 'select_content',
            eventParams: {
              content_type: 'boton_modal',
              section: 'Yiro :: Yiro :: configuracionTarjeta :: bloquearTarjeta',
              previous_section: 'Yiro :: configuracionTarjeta :: menu',
              selected_content: 'Crear nueva cuenta',
              destination_page: `${host}/dashboard`,
              pop_up_type: 'Bloquear',
              pop_up_title: 'Tarjeta bloqueada',
            },
          });
        }}
        fullWidth
        disabled={block}
      >
        Crear nueva cuenta
      </Button>
    </ModalResponsive>
  );
}
