/**
 * QR page.
 *
 * @description Page that generates the QR that redirects to reader.
 * @param {state} setUser - user information
 * @param {function} readCodeFunction - Capture the information, save and redirect
 * @returns {JSX.Element} The rendered page.
 */

'use client';

import { useRouter } from 'next/navigation';
//Internal app
import { QRCodeReader } from '@/components';
import { useQrStore } from '@/store/qrstore';

export default function Qr() {
  const router = useRouter();
  const { setUser } = useQrStore();

  const readCodeFunction = (data: any): Promise<any> => {
    return new Promise((resolve) => {
      console.log('readCodeFunction-pageQR:', data);
      setUser(data);
      router.push('/socket/verify');
      resolve(data);
    });
  };
  return <QRCodeReader readCode={readCodeFunction} />;
}
