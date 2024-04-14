import { Metadata } from 'next';
//Internal app
import { ChildrenProps } from '@/interfaces';
import { LoginLayout, NavExternal } from '@/components';

export const metadata: Metadata = {
  title: 'Belcorp',
  description: 'Envío de credenciales',
};

export default function BelcorpLayout({ children }: ChildrenProps) {
  return <LoginLayout>{children}</LoginLayout>;
}
