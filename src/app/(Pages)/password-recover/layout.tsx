import { Metadata } from 'next';
import { Card } from '@mui/material';
//Internal app
import { NavExternal } from '@/components';
import { ChildrenProps } from '@/interfaces';

export const metadata: Metadata = {
  title: 'Recuperar contraseña',
  description: 'Recupera tu contraseña',
};

export default function RecoverLayout({ children }: ChildrenProps) {
  return (
    <>
      <NavExternal image />
      <Card variant="signup">{children}</Card>
    </>
  );
}
