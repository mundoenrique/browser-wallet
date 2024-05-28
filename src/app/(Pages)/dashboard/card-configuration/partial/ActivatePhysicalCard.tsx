'use client';

import { io, Socket } from 'socket.io-client';
import { useQRCode } from 'next-qrcode';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Grid, Stack, Typography, Box } from '@mui/material';
import { isBrowser, isMobile, isTablet } from 'react-device-detect';
//Internal app
import { useApi } from '@/hooks/useApi';
import { CardIcons } from '%/Icons';
import { useNavTitleStore, useConfigCardStore, useUiStore, useUserStore, useOtpStore } from '@/store';
import { ContainerLayout, HandleCard, Linking, ModalResponsive } from '@/components';
import { getEnvVariable } from '@/utils';
import { useRouter } from 'next/navigation';

interface UseSocketProps {
  onInfoUser: (data: any) => void;
}

const useSocket = ({ onInfoUser }: UseSocketProps) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socketInit = async () => {
      await fetch('/api/socket');
      const socket = io('', {
        path: '/api/my_socket',
      });

      socket.on('connect', () => {
        console.log('Connected', socket.id);
      });

      socket.on('infoUser', (data: any) => {
        onInfoUser(data);
      });

      socket.on('disconnect', () => {
        console.log('Disconnected');
      });

      socketRef.current = socket;
    };

    socketInit();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [onInfoUser]);

  const disconnectSocket = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
    }
  }, []);

  return { socketRef, disconnectSocket };
};

export default function ActivatePhysicalCard() {
  const { updateTitle } = useNavTitleStore();

  const { updatePage } = useConfigCardStore();

  const setModalError = useUiStore((state) => state.setModalError);

  const setCardInformation = useUserStore((state) => state.setCardInformation);

  const { timeLeft, countdown, setTime } = useOtpStore();

  const { userId } = useUserStore((state) => state.user);

  const cardIdActivatePWA = useConfigCardStore((state) => state.cardIdActivatePWA);

  const { SVG } = useQRCode();

  const [showModal, setShowModal] = useState<boolean>(false);

  const [cardId, setCardId] = useState<string | null>(null);

  const timerRef = useRef<any>();

  const baseURL = process.env.NEXT_PUBLIC_WEB_URL;
  // const baseURL = 'https://2fht93dt-3000.use2.devtunnels.ms';
  const url = `${baseURL}/qr`;

  const customApi = useApi();

  const router = useRouter();

  const getCardInformation = useCallback(async () => {
    const cardIdActivate = isBrowser ? cardId : cardIdActivatePWA;
    customApi
      .get(`/cards/${cardIdActivate}`, { params: { decryptData: false } })
      .then((response: any) => {
        const { status, data } = response;
        if (status === 200) {
          setCardInformation(data.data);
        }
      })
      .catch(() => {
        setModalError({ title: 'Algo salió mal', description: 'No descargar la información de tu tarjeta.' });
      });
  }, [cardId, cardIdActivatePWA]); //eslint-disable-line react-hooks/exhaustive-deps

  const cardholderAssociation = useCallback(async () => {
    const cardIdActivate = isBrowser ? cardId : cardIdActivatePWA;
    const data = {
      cardId: cardIdActivate,
      userId,
    };

    customApi
      .post('/cards/cardholders', data)
      .then((response: any) => {
        const { status } = response;
        if (status === 200) {
          if (isBrowser) {
            disconnectSocket();
            setShowModal(false);
          }
          getCardInformation();
          updatePage('success');
        }
      })
      .catch(() => {
        if (isBrowser) {
          disconnectSocket();
          setShowModal(false);
        }
        setModalError({ title: 'Algo salió mal', description: 'No pudimos activar tu tarjeta.' });
      });
  }, [cardId, cardIdActivatePWA]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    updateTitle('Activación de tarjeta física');
  }, [updateTitle]);

  const openModal = () => {
    if (isBrowser) {
      setShowModal(true);
      setTime(60);
      timer();
    } else {
      router.push('/qr');
    }
  };

  const handleInfoUser = useCallback(
    (data: any) => {
      if (data !== null) {
        setCardId(JSON.parse(data));
        cardholderAssociation();
      }
    },
    [cardholderAssociation]
  );

  const { socketRef, disconnectSocket } = useSocket({ onInfoUser: handleInfoUser });

  const timer = useCallback(async () => {
    timerRef.current = setInterval(() => countdown(), 1000);
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (timeLeft === 0) {
      clearInterval(timerRef.current);
      disconnectSocket();
      setShowModal(false);
    }
  }, [timeLeft]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (showModal) {
      socketRef.current?.connect();
    } else {
      disconnectSocket();
      clearInterval(timerRef.current);
    }
  }, [showModal]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (cardIdActivatePWA) {
      cardholderAssociation();
    }
  }, [cardIdActivatePWA]); //eslint-disable-line react-hooks/exhaustive-deps
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
        Para activar tu tarjeta {isBrowser && 'En browser'}
      </Typography>

      <Stack spacing={3}>
        <HandleCard avatar={<CardIcons color="primary" sx={{ p: 1 / 2 }} />}>
          <Typography variant="subtitle2">Escanea el código</Typography>
          <Typography variant="caption">Escanea el código QR presente en el sobre para activarla.</Typography>
        </HandleCard>

        <Button variant="contained" onClick={openModal}>
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
            <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', width: '100%' }}>
              <Typography variant="subtitle1" mb="12px">
                Activación de tarjeta física
              </Typography>
              <Typography variant="body2" mb={2} color="initial">
                Recuerda que para la activación de tu tarjeta debes tener a la mano el sobre donde está te llego.
              </Typography>
              <Typography variant="body2" mb={2} color="initial">
                Escanea el siguiente código QR con tu teléfono para crear una conexión y detectar cuando escanees el
                código del sobre de tu tarjeta física.
              </Typography>
            </Box>
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
          <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Typography variant="body2" mb={2} color="primary.main">
              Tiempo restante - 0:{timeLeft}
            </Typography>
          </Box>
        </Grid>
      </ModalResponsive>
    </ContainerLayout>
  );
}
