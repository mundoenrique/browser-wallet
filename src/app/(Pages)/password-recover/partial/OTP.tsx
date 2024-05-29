'use client';

import { useForm } from 'react-hook-form';
import { Box, Button } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
//Internal app
import { api } from '@/utils/api';
import { getSchema } from '@/config';
import { AuthOtpFormProps } from '@/interfaces';
import InputOTP from '@/components/form/InputOTP';
import { encryptForge } from '@/utils/toolHelper';
import { useOtpStore, useUiStore, useUserStore } from '@/store';

export default function AuthOtp(props: AuthOtpFormProps) {
  const { handleResendOTP } = props;

  const otpUuid = useOtpStore((state) => state.otpUuid);
  const { userId } = useUserStore((state) => state.user);
  const { setLoadingScreen, setModalError } = useUiStore();
  const setOTPValid = useOtpStore((state) => state.setOTPValid);
  const getUserPhone = useUserStore((state) => state.getUserPhone);

  const schema = getSchema(['otp']);
  const phoneNumber: string = getUserPhone();

  const handleReset = () => {
    handleResendOTP();
    reset();
  };

  const { control, handleSubmit, reset } = useForm({
    defaultValues: { otp: '' },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    const { otp } = data;
    setLoadingScreen(true);
    const payload = {
      otpProcessCode: 'CHANGE_PASSWORD_OTP',
      otpUuId: otpUuid,
      otpCode: encryptForge(otp),
    };

    api
      .post(`/users/${userId}/validate/tfa`, payload)
      .then((response) => {
        const { status } = response;
        if (status === 200) {
          setOTPValid('PASSWORD');
        }
      })
      .catch((e) => {
        setModalError({ error: e });
      })
      .finally(() => {
        setLoadingScreen(false);
        reset();
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
          handleResendOTP={handleReset}
        />
      </Box>
      <Button variant="contained" type="submit" sx={{ maxWidth: 284, width: '100%', mx: 'auto', mb: { xs: 3, md: 0 } }}>
        Continuar
      </Button>
    </Box>
  );
}
