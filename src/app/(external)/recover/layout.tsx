import { Metadata } from 'next';
//Internal app
import { AuthOtpProps } from '@/interfaces';
import { CardOnboarding, NavExternal } from '@/components';

export const metadata: Metadata = {
  title: 'Recover',
  description: 'Recupera tu contraseña',
};

export default async function layout({ children, authOtp }: AuthOtpProps) {
  return (
    <>
      <NavExternal image relative />
      <CardOnboarding>{true ? <>{children}</> : <>{authOtp}</>}</CardOnboarding>
    </>
  );
}
