import { Metadata } from 'next';
//Internal app
import { LoginLayout } from '@/components';
import { ChildrenProps } from '@/interfaces';

export const metadata: Metadata = {
  title: 'Signin',
  description: 'Inicio de sesión en tu bolsillo',
};

export default function SigninLayout({ children }: ChildrenProps) {
  return <LoginLayout>{children}</LoginLayout>;
}
