import { Metadata } from 'next';
//Internal app
import { MainLayout } from '@/components';
import { ChildrenProps } from '@/interfaces';

export const metadata: Metadata = {
  title: 'Inicio',
  description: 'Inicio en tu billetera Yiro',
};

export default function DashbaordLayout({ children }: ChildrenProps) {
  return <MainLayout>{children}</MainLayout>;
}
