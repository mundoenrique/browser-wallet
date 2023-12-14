'use client';

import io from 'socket.io-client';
import { useEffect, useState } from 'react';

let socket: any;

export default function Page() {
  const [apiData, setApiData] = useState<any>(null);

  useEffect(() => {
    const socketInit = async () => {
      await fetch('/api/socket');
      socket = io('', {
        path: '/api/my_socket',
      });

      socket.on('connect', () => {
        console.log('Connected', socket.id);
      });

      socket.on('movementsChange', (data: any) => {
        setApiData(data.data);
      });
    };
    socketInit();
  }, []);

  return (
    <div>
      <h1>Hello, Next.js!</h1>
      <h1>Next.js con Socket.IO y API externa</h1>
      {apiData && (
        <div>
          <h2>Últimos movimientos:</h2>
          <ul>
            {apiData.map((movement: any) => (
              <li key={movement.id}>{movement.description}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
