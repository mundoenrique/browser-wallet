'use client';
import { useEffect } from 'react';
import io from 'socket.io-client';
let socket;

export default function Page() {
  useEffect(() => {
    const socketInit = async () => {
      await fetch('/api/socket');
      socket = io(undefined, {
        path: '/api/my_awesome_socket',
      });

      socket.on('connect', () => {
        console.log('Connected', socket.id);
      });

      socket.on('connect', () => {
        console.log('connected');
      });
    };
    socketInit();
  }, []);

  return <h1>Hello, Next.js!</h1>;
}
