import { Metadata } from 'next';
//Internal app
import { ChildrenProps } from '@/interfaces';
import { LoginLayout, NotFoundError } from '@/components';

export const metadata: Metadata = {
  title: 'Belcorp',
  description: 'Envío de credenciales',
};

export default function BelcorpLayout({ children }: ChildrenProps) {
  if (process.env.ACCESS_BELCORP == 'OFF') return <NotFoundError code={404} />;
  return <LoginLayout>{children}</LoginLayout>;
}
