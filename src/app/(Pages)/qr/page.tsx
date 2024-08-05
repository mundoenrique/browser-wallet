'use client';

import { useEffect } from 'react';
import io from 'socket.io-client';
import { sendGTMEvent } from '@next/third-parties/google';
//Internal app
import { QRCodeReader } from '@/components';
import { useHeadersStore, useUiStore } from '@/store';

let socket: any;

export default function Qr() {
  const host = useHeadersStore((state) => state.host);

  useEffect(() => {
    sendGTMEvent({
      event: 'ga4.trackEvent',
      eventName: 'page_view_ga4',
      eventParams: {
        page_location: `${host}/dashboard/card-configuration/activaTarjetaFisica/escaneaQR`,
        page_title: 'Yiro :: configuracionTarjeta :: activaTarjetaFisica :: escaneaQR',
        page_referrer: `${host}/dashboard/card-configuration/activaTarjetaFisica/inicio`,
        section: 'Yiro :: configuracionTarjeta :: activaTarjetaFisica :: escaneaQR',
        previous_section: 'Yiro :: configuracionTarjeta :: activaTarjetaFisica :: inicio',
      },
    });
  }, [host]);

  const { setLoadingScreen, setModalError } = useUiStore();
  const handleSocketEmit = async (cardId: any) => {
    await fetch('/api/socket');
    socket = io('', {
      path: '/api/my_socket',
    });
    socket.emit('sendData', cardId);
  };

  useEffect(() => {
    setLoadingScreen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const readCodeFunction = (cardId: any): Promise<any> => {
    return new Promise((resolve) => {
      if (!cardId) {
        resolve(null);
        setModalError({ title: 'No pudimos escanear el código', description: 'Intentalo más tarde.' });
      } else {
        setTimeout(() => {
          setLoadingScreen(true, { message: 'Escáneo correcto, continua el proceso en la pc.' });
          handleSocketEmit(cardId);
          resolve(cardId);
          socket.disconnect();
        }, 5000);
      }
    });
  };
  return <QRCodeReader readCode={readCodeFunction} />;
}
