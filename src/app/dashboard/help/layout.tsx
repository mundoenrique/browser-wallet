import { Metadata } from 'next';
//Internal app
import { ChildrenProps } from '@/interfaces';

export const metadata: Metadata = {
  title: 'Ayuda',
  description: 'Sección de ayuda para las dudas que tengas de tu billetera Yiro',
};

export default function LegalLayout({ children }: ChildrenProps) {
  return <>{children}</>;
}
