'use client';

//Internal app
import { QRCodeReader } from '@/components';
import { useQrStore } from '@/store/qrstore';
import { useRouter } from 'next/navigation';

export default function Qr() {
  const router = useRouter();
  const { setUser } = useQrStore();

  const readCodeFunction = (data: any): Promise<any> => {
    return new Promise((resolve) => {
      console.log('readCodeFunction-pageQR:', data);
      setUser(data);
      router.push('/card/verify');
      resolve(data);
    });
  };
  return <QRCodeReader readCode={readCodeFunction} />;
}
