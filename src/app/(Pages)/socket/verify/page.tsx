'use client';

import { useEffect } from 'react';
import io from 'socket.io-client';
import { Typography } from '@mui/material';
//Internal app
import { useQrStore } from '@/store';

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
  }, [handleSocketEmit]);

  return (
    <>
      <Typography variant="h1">VerifyCard</Typography>
      <Typography variant="h3">{user}</Typography>
    </>
  );
}
