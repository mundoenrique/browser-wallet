import { Metadata } from 'next';
//Internal app
import { ChildrenProps } from '@/interfaces';
import { MainLayout, NavExternal } from '@/components';

export const metadata: Metadata = {
  title: 'Signin',
  description: 'Inicio de sesión en tu bolsillo',
};

export default function SigninLayout({ children }: ChildrenProps) {
  return (
    <MainLayout>
      <NavExternal color="white" closeApp />
      {children}
    </MainLayout>
  );
}
