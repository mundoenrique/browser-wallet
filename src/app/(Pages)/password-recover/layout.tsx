import { Metadata } from 'next';
//Internal app
import { ChildrenProps } from '@/interfaces';

export const metadata: Metadata = {
  title: 'Recuperar contraseña',
  description: 'Recupera tu contraseña',
};

export default function RecoverLayout({ children }: Readonly<ChildrenProps>) {
  return <>{children}</>;
}
