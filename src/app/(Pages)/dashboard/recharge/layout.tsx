import { Metadata } from 'next';
//Internal app
import { RCProps } from '@/interfaces';

export const metadata: Metadata = {
  title: 'Recargar',
  description: 'Recarga tu billetera Yiro',
};

export default function RechargeLayout({ children, responseCode }: RCProps) {
  return children ? <>{children}</> : <>{responseCode}</>;
}
