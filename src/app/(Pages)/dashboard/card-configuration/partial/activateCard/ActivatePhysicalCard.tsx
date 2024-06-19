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
import { useNavTitleStore, useConfigCardStore, useUiStore, useUserStore, useOtpStore } from '@/store';

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

  const { timeLeft, countdown, setTime } = useOtpStore();

  const { userId } = useUserStore((state) => state.user);

  const setModalError = useUiStore((state) => state.setModalError);

  const setCardInformation = useUserStore((state) => state.setCardInformation);

  const { SVG } = useQRCode();

  const [showQR, setShowQR] = useState<boolean>(false);

  const [cardId, setCardId] = useState<string | null>(null);

  const [showModal, setShowModal] = useState<boolean>(false);

  const timerRef = useRef<any>();

  const baseURL = process.env.NEXT_PUBLIC_WEB_URL;
  const url = `${baseURL}/qr`;

  const getCardInformation = useCallback(async () => {
    api
      .get(`/cards/${cardId}`, { params: { decryptData: false } })
      .then((response: any) => {
        const { status, data } = response;
        if (status === 200) {
          setCardInformation(data.data);
        }
      })
      .catch(() => {
        setModalError({ title: 'Algo salió mal', description: 'No descargar la información de tu tarjeta.' });
      });
  }, [cardId]); //eslint-disable-line react-hooks/exhaustive-deps

  const cardholderAssociation = useCallback(async () => {
    const data = {
      cardId,
      userId,
    };

    api
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
  }, [cardId]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    updateTitle('Activación de tarjeta física');
  }, [updateTitle]);

  const openModal = () => {
    setCardId(null);
    if (isBrowser) {
      setShowModal(true);
      setTime(120);
      timer();
    } else {
      setShowQR(true);
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

  const readCodeFunction = (data: any): Promise<any> => {
    return new Promise((resolve) => {
      if (data) {
        setCardId(JSON.parse(data));
        setShowQR(false);
        cardholderAssociation();
      }
      resolve(data);
    });
  };

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
