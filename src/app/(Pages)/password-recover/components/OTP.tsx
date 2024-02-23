'use client';

import { useForm } from 'react-hook-form';
import { Box, Button } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
//Internal app
import { getSchema } from '@/config';
import { AuthOtpFormProps } from '@/interfaces';
import InputOTP from '@/components/form/InputOTP';

export default function AuthOtp(props: AuthOtpFormProps) {
  const { setOTP } = props;
  const schema = getSchema(['otp']);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      otp: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    console.log(data);
    fetch('/signup').then((result) => {
      console.log(result);

      result.status === 200 && setOTP(true);
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
      <Box sx={{ textAlign: 'center' }}>
        <InputOTP
          name="otp"
          control={control}
          length={4}
          title="Activación de doble factor"
          text="Hemos enviado por tu seguridad un código SMS a tu celular *** *** 1214. Ingrésalo aquí."
        />
      </Box>
      <Button variant="contained" type="submit" sx={{ maxWidth: 284, width: '100%', mx: 'auto', mb: { xs: 3, md: 0 } }}>
        Continuar
      </Button>
    </Box>
  );
}
