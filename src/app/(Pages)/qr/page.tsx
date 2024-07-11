'use client';

import io from 'socket.io-client';
//Internal app
import { QRCodeReader } from '@/components';

let socket: any;

export default function Qr() {
  const handleSocketEmit = async (cardId: any) => {
    await fetch('/api/socket');
    socket = io('', {
      path: '/api/my_socket',
    });
    socket.emit('sendData', cardId);
  };

  const readCodeFunction = (cardId: any): Promise<any> => {
    return new Promise((resolve) => {
      if (!cardId) {
        resolve(null);
      } else {
        handleSocketEmit(cardId);
        resolve(cardId);
        socket.disconnect();
      }
    });
  };
  return <QRCodeReader readCode={readCodeFunction} />;
}
