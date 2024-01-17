import { Metadata } from 'next';
//Internal app
import { ChildrenProps } from '@/interfaces';
import { GradientContainer, NavExternal } from '@/components';

export const metadata: Metadata = {
  title: 'Onboarding',
  description: 'Proceso de registro en tu bolsillo',
};

export default function DashboardLayout({ children }: ChildrenProps) {
  return (
    <GradientContainer>
      <NavExternal relative image />
      {children}
    </GradientContainer>
  );
}
