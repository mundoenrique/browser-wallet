import { Metadata } from 'next';
//Internal app
import { ChildrenProps } from '@/interfaces';

export const metadata: Metadata = {
  title: 'Recover',
  description: 'Recupera tu contraseña',
};

export default function layout({ children }: ChildrenProps) {
  return <>{children}</>;
}
