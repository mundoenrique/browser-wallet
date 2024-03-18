import { Metadata } from 'next';
//Internal app
import { ChildrenProps } from '@/interfaces';

export const metadata: Metadata = {
  title: 'Ayuda | Yiro',
  description: 'Sección de ayuda para las dudas que tengas de tu billetera Yiro',
};

export default function HelpLayout({ children }: ChildrenProps) {
  return <>{children}</>;
}
