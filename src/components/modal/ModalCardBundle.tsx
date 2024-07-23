'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Typography, Stack, Button } from '@mui/material';
import { sendGTMEvent } from '@next/third-parties/google';

//Internal app
import { useHeadersStore, useUserStore, useUiStore } from '@/store';
import ModalResponsive from './ModalResponsive';
import { api } from '@/utils/api';

export default function ModalCardBundle({ open }: { open: boolean }) {
  const router = useRouter();

  const setUser = useUserStore((state) => state.setUser);

  const { userId } = useUserStore((state) => state.user);

  const host = useHeadersStore((state) => state.host);

  const setModalError = useUiStore((state) => state.setModalError);

  const setLoadingScreen = useUiStore((state) => state.setLoadingScreen);

  const [loading, setLoading] = useState<boolean>(false);

  const getUserDetails = async () => {
    await api.get(`/users/${userId}`).then((response) => {
      const userDetail = response.data.data;
      setUser(userDetail);
    });
  };

  const requestBundledCard = async () => {
    setLoadingScreen(true);
    setLoading(true);
    const payload = {
      userId: userId,
    };

    api
      .post('/cards/issuance', payload)
      .then(async () => {
        await getUserDetails();
      })
      .catch((e) => {
        setModalError({ error: e });
      })
      .finally(() => {
        setLoadingScreen(false);
        setLoading(false);
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
        disabled={loading}
      >
        Crear nueva cuenta
      </Button>
    </ModalResponsive>
  );
}
