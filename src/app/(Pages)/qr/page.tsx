'use client';

import io from 'socket.io-client';
//Internal app
import { QRCodeReader } from '@/components';
import { useUiStore } from '@/store';
import { useEffect } from 'react';

let socket: any;

export default function Qr() {
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
