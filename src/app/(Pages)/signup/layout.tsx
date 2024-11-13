import { Metadata } from 'next';
//Internal app
import { ChildrenProps } from '@/interfaces';

export const metadata: Metadata = {
  title: 'Registro',
  description: 'Proceso de registro en tu bolsillo',
};

export default function SignupLayout({ children }: Readonly<ChildrenProps>) {
  return <>{children}</>;
}
