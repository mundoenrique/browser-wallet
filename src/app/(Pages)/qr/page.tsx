'use client';
import { isBrowser } from 'react-device-detect';
import io from 'socket.io-client';
//Internal app

import { QRCodeReader } from '@/components';
import { useCallback, useEffect, useState } from 'react';
import { useConfigCardStore } from '@/store';
import { useRouter } from 'next/navigation';

let socket: any;

export default function Qr() {
  const router = useRouter();
  const { updatePage } = useConfigCardStore();
  const [cardIdActivate, setCardIdActivate] = useState<any>(null);
  const setCardIdActivatePWA = useConfigCardStore((state) => state.setCardIdActivatePWA);
  const handleSocketEmit = useCallback(async () => {
    await fetch('/api/socket');
    socket = io('', {
      path: '/api/my_socket',
    });
    socket.emit('sendData', cardIdActivate);
  }, [cardIdActivate]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    handleSocketEmit();
  }, [handleSocketEmit]);

  const readCodeFunction = (data: any): Promise<any> => {
    return new Promise((resolve) => {
      if (isBrowser) {
        setCardIdActivate(data);
      } else {
        setCardIdActivatePWA(JSON.parse(data));
        updatePage('activatePhysicalCard');
        router.push('/dashboard/card-configuration');
      }
      resolve(data);
    });
  };
  return <QRCodeReader readCode={readCodeFunction} />;
}
