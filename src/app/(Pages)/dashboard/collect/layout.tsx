import { Metadata } from 'next';
//Internal app
import { ChildrenProps } from '@/interfaces';

export const metadata: Metadata = {
  title: 'Cobrar | Yiro',
  description: 'Cobrale a tus clientes através de nuestros distintos medios de pago en Yiro',
};

export default function CollectLayout({ children }: ChildrenProps) {
  return <>{children}</>;
}
