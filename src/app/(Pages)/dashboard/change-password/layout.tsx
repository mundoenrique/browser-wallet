import { Metadata } from 'next';
//Internal app
import { ChildrenProps } from '@/interfaces';

export const metadata: Metadata = {
  title: 'Cambiar contraseña | Yiro',
  description: 'Cambiar contraseña en Yiro',
};

export default function ChangePasswordLayout({ children }: Readonly<ChildrenProps>) {
  return <>{children}</>;
}
