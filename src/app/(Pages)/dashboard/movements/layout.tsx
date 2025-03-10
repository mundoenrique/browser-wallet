import { Metadata } from 'next';
//Internal app
import { ChildrenProps } from '@/interfaces';

export const metadata: Metadata = {
  title: 'Movimientos | Yiro',
  description: 'Historial de movimientos en Yiro',
};

export default function MovementsLayout({ children }: Readonly<ChildrenProps>) {
  return <>{children}</>;
}
