'use client';

import { useQrStore } from '@/store/qrstore';
import { useEffect } from 'react';
import io from 'socket.io-client';

let socket: any;

export default function VerifyCard() {
  const { user } = useQrStore();

  const handleSocketEmit = async () => {
    await fetch('/api/socket');
    socket = io('', {
      path: '/api/my_socket',
    });
    console.log('Emitiendo datos al servidor:', user);
    socket.emit('sendData', user);
  };

  useEffect(() => {
    handleSocketEmit();
  }, []);

  return (
    <>
      <h1>VerifyCard</h1>
      <h3>{user}</h3>
    </>
  );
}
