import { Metadata } from 'next';
//Internal app
import { ChildrenProps } from '@/interfaces';

export const metadata: Metadata = {
  title: 'Movimientos',
  description: 'Historial de movimientos en Yiro',
};

export default function DashbaordLayout({ children }: ChildrenProps) {
  return <>{children}</>;
}
