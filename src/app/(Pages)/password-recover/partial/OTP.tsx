'use client';

import { useForm } from 'react-hook-form';
import { Box, Button } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
//Internal app
import { getSchema } from '@/config';
import { AuthOtpFormProps } from '@/interfaces';
import InputOTP from '@/components/form/InputOTP';
import { useApi } from '@/hooks/useApi';
import { useRegisterStore, useUiStore, useUserStore } from '@/store';
import { encryptForge } from '@/utils/toolHelper';

export default function AuthOtp(props: AuthOtpFormProps) {
  const { setOTP, optUuid } = props;
  const customApi = useApi();
  const schema = getSchema(['otp']);

  const { setLoadingScreen, loadingScreen, setModalError } = useUiStore();
  const { getUserId } = useRegisterStore();
  const { getUserPhone } = useUserStore();

  const phoneNumber: string = getUserPhone();
  const { control, handleSubmit } = useForm({
    defaultValues: { otp: '' },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    const { otp } = data;
    const userId: string = getUserId();
    setLoadingScreen(true);
    const payload = {
      otpProcessCode: 'CHANGE_PASSWORD_OTP',
      otpUuId: optUuid,
      otpCode: encryptForge(otp),
    };
    customApi
      .post(`/users/${userId}/validate/tfa`, payload)
      .then((response) => {
        const { status } = response;
        if (status === 200) {
          setOTP(true);
        }
      })
      .catch((error) => {
        setModalError({ title: 'Algo salió mal', description: 'Intentalo nuevamente' });
      })
      .finally(() => {
        setLoadingScreen(false);
      });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ textAlign: { md: 'center' } }}>
        <InputOTP
          name="otp"
          control={control}
          length={4}
          title="Recupera tu contraseña"
          text={`Hemos enviado por tu seguridad un código SMS a tu celular ${phoneNumber}. Ingrésalo aquí.`}
        />
      </Box>
      <Button variant="contained" type="submit" sx={{ maxWidth: 284, width: '100%', mx: 'auto', mb: { xs: 3, md: 0 } }}>
        Continuar
      </Button>
    </Box>
  );
}
