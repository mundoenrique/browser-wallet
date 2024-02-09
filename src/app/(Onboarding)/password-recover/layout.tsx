import { Metadata } from 'next';
import { Card } from '@mui/material';
//Internal app
import { RCProps } from '@/interfaces';
import { NavExternal } from '@/components';

export const metadata: Metadata = {
  title: 'Recover',
  description: 'Recupera tu contraseña',
};

export default async function RecoverLayout({ children, responseCode }: RCProps) {
  return (
    <>
      <NavExternal image />
      <Card variant="signup">{true ? <>{children}</> : <>{responseCode}</>}</Card>
    </>
  );
}
