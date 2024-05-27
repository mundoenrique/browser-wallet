'use client';
import io from 'socket.io-client';
//Internal app

import { QRCodeReader } from '@/components';
import { useCallback, useEffect, useState } from 'react';

let socket: any;

export default function Qr() {
  const [cardIdActivate, setCardIdActivate] = useState<any>(null);

  const handleSocketEmit = useCallback(async () => {
    await fetch('/api/socket');
    socket = io('', {
      path: '/api/my_socket',
    });
    socket.emit('sendData', cardIdActivate);
  }, [cardIdActivate]);

  useEffect(() => {
    handleSocketEmit();
  }, [handleSocketEmit]);

  const readCodeFunction = (data: any): Promise<any> => {
    return new Promise((resolve) => {
      setCardIdActivate(data);
      resolve(data);
    });
  };
  return <QRCodeReader readCode={readCodeFunction} />;
}
