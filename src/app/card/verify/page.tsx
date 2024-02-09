'use client';

import { useQrStore } from '@/store/qrstore';
import { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io();

export default function VerifyCard() {
  const { user } = useQrStore();

  useEffect(() => {
    socket.emit('msjClient', user);
  }, []);

  return (
    <>
      <h1>VerifyCard</h1>
      <h3>{user}</h3>
    </>
  );
}
