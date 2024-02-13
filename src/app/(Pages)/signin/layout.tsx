import { Metadata } from 'next';
//Internal app
import { ChildrenProps } from '@/interfaces';
import { LoginLayout, NavExternal } from '@/components';

export const metadata: Metadata = {
  title: 'Signin',
  description: 'Inicio de sesión en tu bolsillo',
};

export default function SigninLayout({ children }: ChildrenProps) {
  return (
    <LoginLayout>
      <NavExternal color="white" closeApp />
      {children}
    </LoginLayout>
  );
}
