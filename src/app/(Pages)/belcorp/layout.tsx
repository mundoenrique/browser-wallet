import { Metadata } from 'next';
//Internal app
import { ChildrenProps } from '@/interfaces';
import { LoginLayout, NotFoundError } from '@/components';

export const metadata: Metadata = {
  title: 'Belcorp',
  description: 'Envío de credenciales',
};

export default function BelcorpLayout({ children }: ChildrenProps) {
  if (process.env.WEB_ENV === 'prod' || process.env.WEB_ENV === 'uat') return <NotFoundError code={404} />;
  return <LoginLayout>{children}</LoginLayout>;
}
