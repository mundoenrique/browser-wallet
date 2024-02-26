import { Metadata } from 'next';
import { Card } from '@mui/material';
//Internal app
import { NavExternal } from '@/components';
import { ChildrenProps } from '@/interfaces';

export const metadata: Metadata = {
  title: 'Recover',
  description: 'Recupera tu contraseña',
};

export default async function RecoverLayout({ children }: ChildrenProps) {
  return (
    <>
      <NavExternal image />
      <Card variant="signup">{children}</Card>
    </>
  );
}
