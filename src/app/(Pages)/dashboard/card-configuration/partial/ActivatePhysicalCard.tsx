'use client';

import io from 'socket.io-client';
import { useQRCode } from 'next-qrcode';
import { useCallback, useEffect, useState } from 'react';
import { Button, Grid, Stack, Typography } from '@mui/material';
//Internal app
import { useApi } from '@/hooks/useApi';
import { CardIcons } from '%/Icons';
import { useNavTitleStore, useConfigCardStore, useUiStore, useUserStore } from '@/store';
import { ContainerLayout, HandleCard, Linking, ModalResponsive } from '@/components';
import { getEnvVariable } from '@/utils';

let socket: any;

export default function ActivatePhysicalCard() {
  const { updateTitle } = useNavTitleStore();
  const { updatePage } = useConfigCardStore();
  const setModalError = useUiStore((state) => state.setModalError);
  const { userId } = useUserStore((state) => state.user);
  const { SVG } = useQRCode();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [cardId, setCardId] = useState<string | null>(null);

  // const baseURL = process.env.NEXT_PUBLIC_WEB_URL;
  const baseURL = 'https://2fht93dt-3000.use2.devtunnels.ms';
  const url = `${baseURL}/qr`;

  const customApi = useApi();

  const cardholderAssociation = useCallback(async () => {
    customApi
      .post('/cards/cardholders', { cardId, userId })
      .then((response: any) => {
        console.log('🚀 ~ cardholderAssociation ~ response:', response);
      })
      .catch(() => {
        console.log('🚀 ~ cardholderAssociation ~ error:');
        setModalError({ title: 'Algo salió mal', description: 'No pudimos activar tu tarjeta.' });
      });
  }, [cardId, userId]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    updateTitle('Activación de tarjeta física');
  }, [updateTitle]);

  useEffect(() => {
    const socketInit = async () => {
      await fetch('/api/socket');
      socket = io('', {
        path: '/api/my_socket',
      });

      socket.on('connect', () => {
        console.log('Connected', socket.id);
      });

      socket.on('infoUser', (data: any) => {
        if (data !== null) {
          setCardId(data);
          setShowModal(false);
          cardholderAssociation();
          socket.emit('disconnect');
        }
      });
    };
    socketInit();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ContainerLayout>
      <Typography
        variant="h6"
        color="primary"
        sx={{ color: 'primary.main', mb: 6, display: { xs: 'none ', md: 'block' }, textAlign: 'center' }}
      >
        Activación de tarjeta física
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
        Para activar tu tarjeta
      </Typography>

      <Stack spacing={3}>
        <HandleCard avatar={<CardIcons color="primary" sx={{ p: 1 / 2 }} />}>
          <Typography variant="subtitle2">Escanea el código</Typography>
          <Typography variant="caption">Escanea el código QR presente en el sobre para activarla.</Typography>
        </HandleCard>

        <Button variant="contained" onClick={() => setShowModal(true)}>
          Escanear Código QR
        </Button>
      </Stack>
      <ModalResponsive open={showModal} handleClose={() => setShowModal(false)}>
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="subtitle1" mb="12px">
              Escanear el QR, desde tu dispositivo móvil.
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <SVG
              text={url}
              options={{
                margin: 2,
                width: 200,
              }}
            />
          </Grid>
        </Grid>
      </ModalResponsive>
    </ContainerLayout>
  );
}
