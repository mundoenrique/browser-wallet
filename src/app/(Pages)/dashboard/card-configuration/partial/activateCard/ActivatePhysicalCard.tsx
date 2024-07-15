'use client';

import { useQRCode } from 'next-qrcode';
import { io, Socket } from 'socket.io-client';
import { isBrowser } from 'react-device-detect';
import { Button, Stack, Typography, Box } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
//Internal app
import { api } from '@/utils/api';
import { CardIcons } from '%/Icons';
import { formatTime } from '@/utils/toolHelper';
import { ContainerLayout, HandleCard, Linking, ModalResponsive, QRCodeReader } from '@/components';
import { useNavTitleStore, useConfigCardStore, useUiStore, useUserStore, useOtpStore, useHeadersStore } from '@/store';
import { sendGTMEvent } from '@next/third-parties/google';

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
        if (data) {
          socket.disconnect();
          onInfoUser(data);
        }
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
  }, []);

  const disconnectSocket = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
    }
  }, []);

  return { socketRef, disconnectSocket };
};

export default function ActivatePhysicalCard() {
  const updateTitle = useNavTitleStore((state) => state.updateTitle);

  const updatePage = useConfigCardStore((state) => state.updatePage);

  const host = useHeadersStore((state) => state.host);

  const setTime = useOtpStore((state) => state.setTime);

  const { userId } = useUserStore((state) => state.user);

  const timeLeft = useOtpStore((state) => state.timeLeft);

  const countdown = useOtpStore((state) => state.countdown);

  const setModalError = useUiStore((state) => state.setModalError);

  const setCardInformation = useUserStore((state) => state.setCardInformation);

  const { SVG } = useQRCode();

  const [showQR, setShowQR] = useState<boolean>(false);

  const [showModal, setShowModal] = useState<boolean>(false);

  const timerRef = useRef<any>();

  const cardId = useRef<string | null>(null);

  const baseURL = process.env.NEXT_PUBLIC_WEB_URL;
  const url = `${baseURL}/qr`;

  const getCardInformation = async () => {
    await api
      .get(`/cards/${cardId.current}`, { params: { decryptData: false } })
      .then((response: any) => {
        const { status, data } = response;
        if (status === 200) {
          setCardInformation(data.data);
        }
      })
      .catch(() => {
        setModalError({ title: 'Algo salió mal', description: 'No descargar la información de tu tarjeta.' });
      });
  };

  const cardholderAssociation = async () => {
    const data = {
      cardId: cardId.current,
      userId,
    };
    await api
      .post('/cards/cardholders', data)
      .then((response: any) => {
        const { status } = response;
        if (status === 200) {
          if (isBrowser) {
            setShowModal(false);
          }
          getCardInformation();
          updatePage('success');
        }
      })
      .catch((e) => {
        if (isBrowser) {
          setShowModal(false);
        }
        setModalError({ title: 'Algo salió mal', description: 'No pudimos activar tu tarjeta.' });
      });
  };

  useEffect(() => {
    updateTitle('Activación de tarjeta física');
  }, [updateTitle]);

  const openModal = () => {
    cardId.current = null;
    if (isBrowser) {
      setShowModal(true);
      setTime(120);
      timer();
    } else {
      setShowQR(true);
    }
    sendGTMEvent({
      event: 'ga4.trackEvent',
      eventName: 'select_content',
      eventParams: {
        content_type: 'boton',
        section: 'Yiro :: configuracionTarjeta :: activaTarjetaFisica :: inicio',
        previous_section: 'Yiro :: configuracionTarjeta :: menu',
        selected_content: 'Escanear Código QR',
        destination_page: `${host}/dashboard/card-configuration/activaTarjetaFisica/escaneaQR`,
      },
    });
  };

  const handleInfoUser = async (data: any) => {
    if (data !== null && typeof data === 'string') {
      disconnectSocket();
      cardId.current = JSON.parse(data);
      await cardholderAssociation();
    }
  };

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
      cardId.current = null;
      socketRef.current?.connect();
    } else {
      disconnectSocket();
      clearInterval(timerRef.current);
    }
  }, [showModal]); //eslint-disable-line react-hooks/exhaustive-deps

  const readCodeFunction = (data: any): Promise<any> => {
    console.log('🚀 ~ readCodeFunction ~ data:', data);
    return new Promise((resolve) => {
      if (data) {
        cardId.current = JSON.parse(data);
        setShowQR(false);
        cardholderAssociation();
      }
      resolve(data);
    });
  };

  useEffect(() => {
    sendGTMEvent({
      event: 'ga4.trackEvent',
      eventName: 'page_view_ga4',
      eventParams: {
        page_location: `${host}/dashboard/card-configuration/activaTarjetaFisica/inicio`,
        page_title: 'Yiro :: configuracionTarjeta :: activaTarjetaFisica :: inicio',
        page_referrer: `${host}/dashboard/card-configuration/menu`,
        section: 'Yiro :: configuracionTarjeta :: activaTarjetaFisica :: inicio',
        previous_section: 'Yiro :: configuracionTarjeta :: menu',
      },
    });
  }, [host]);

  return (
    <>
      {showQR ? (
        <QRCodeReader readCode={readCodeFunction} />
      ) : (
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
              {showQR ? (
                <Typography variant="caption" mb={2}>
                  Escanea el código QR presente en el sobre para activarla.
                </Typography>
              ) : (
                <>
                  <Typography variant="caption" mb={2}>
                    <b>Paso 1:</b> Escanea con tu teléfono el código QR que aparece en tu pantalla.
                  </Typography>
                  <Typography variant="caption">
                    <b>Paso 2:</b> Escanea el código del sobre que recibiste con tu tarjeta física.
                  </Typography>
                </>
              )}
            </HandleCard>

            <Button variant="contained" onClick={openModal}>
              Escanear Código QR
            </Button>
          </Stack>

          <ModalResponsive open={showModal} handleClose={() => setShowModal(false)}>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              <Typography variant="subtitle1" mb={3}>
                Activación de tarjeta física
              </Typography>

              <Typography variant="body2" mb={2} textAlign="start">
                <b>Paso 1:</b> Escanea con tu teléfono el código QR que aparece en tu pantalla.
              </Typography>
              <SVG
                text={url}
                options={{
                  margin: 2,
                  width: 200,
                }}
              />
              <Typography variant="body2" mb={2} textAlign="start">
                <b>Paso 2:</b> Escanea el código del sobre que recibiste con tu tarjeta física.
              </Typography>
            </Box>
            {timeLeft > 0 && (
              <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', width: '100%' }}>
                <Typography variant="body2" mb={2}>
                  Tiempo restante - {formatTime(timeLeft)}
                </Typography>
              </Box>
            )}
          </ModalResponsive>
        </ContainerLayout>
      )}
    </>
  );
}
