'use client';

import { useRouter } from 'next/navigation';
//Internal app
import { useQrStore } from '@/store';
import { QRCodeReader } from '@/components';

export default function Qr() {
  const { push } = useRouter();
  const { setUser } = useQrStore();

  const readCodeFunction = (data: any): Promise<any> => {
    return new Promise((resolve) => {
      console.log('readCodeFunction-pageQR:', data);
      setUser(data);
      push('/socket/verify');
      resolve(data);
    });
  };
  return <QRCodeReader readCode={readCodeFunction} />;
}
