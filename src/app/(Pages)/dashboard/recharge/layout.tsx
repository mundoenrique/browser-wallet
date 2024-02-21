import { Metadata } from 'next';
//Internal app
import { ChildrenProps } from '@/interfaces';

export const metadata: Metadata = {
  title: 'Recargar',
  description: 'Recarga tu billetera Yiro',
};

export default function RechargeLayout({ children }: ChildrenProps) {
  return <>{children}</>;
}
