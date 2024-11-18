import { Metadata } from 'next';
//Internal app
import { ChildrenProps } from '@/interfaces';

export const metadata: Metadata = {
  title: 'Legal | Yiro',
  description: 'Términos y condiciones del servicio Yiro',
};

export default function LegalLayout({ children }: Readonly<ChildrenProps>) {
  return <>{children}</>;
}
