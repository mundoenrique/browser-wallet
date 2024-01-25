import { Metadata } from 'next';
//Internal app
import { ChildrenProps } from '@/interfaces';

export const metadata: Metadata = {
  title: 'Onboarding',
  description: 'Proceso de registro en tu bolsillo',
};

export default function SignupLayout({ children }: ChildrenProps) {
  return <>{children}</>;
}
