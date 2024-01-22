import { Metadata } from 'next';
//Internal app
import { MainLayout } from '@/components';
import { ChildrenProps } from '@/interfaces';

export const metadata: Metadata = {
  title: 'Signin',
  description: 'Inicio de sesión en tu bolsillo',
};

export default function layout({ children }: ChildrenProps) {
  return <MainLayout>{children}</MainLayout>;
}
