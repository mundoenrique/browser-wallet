import { Metadata } from 'next';
import { Card } from '@mui/material';
//Internal app
import { AuthOtpProps } from '@/interfaces';
import { NavExternal } from '@/components';

export const metadata: Metadata = {
  title: 'Recover',
  description: 'Recupera tu contraseña',
};

export default async function RecoverLayout({ children, authOtp }: AuthOtpProps) {
  return (
    <>
      <NavExternal image />
      <Card variant="signup">{authOtp ? <>{authOtp}</> : <>{children}</>}</Card>
    </>
  );
}
