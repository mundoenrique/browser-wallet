import { Metadata } from 'next';
//Internal app
import { ChildrenProps } from '@/interfaces';

export const metadata: Metadata = {
  title: 'Mis clientes | Yiro',
  description: 'Gestiona tus clientes en Yiro',
};

export default function ClientsLayout({ children }: Readonly<ChildrenProps>) {
  return <>{children}</>;
}
