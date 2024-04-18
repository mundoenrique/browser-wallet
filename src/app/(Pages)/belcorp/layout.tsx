import { Metadata } from 'next';
//Internal app
import { LoginLayout } from '@/components';
import { ChildrenProps } from '@/interfaces';

export const metadata: Metadata = {
  title: 'Belcorp',
  description: 'Envío de credenciales',
};

export default function BelcorpLayout({ children }: ChildrenProps) {
  return <LoginLayout>{children}</LoginLayout>;
}
