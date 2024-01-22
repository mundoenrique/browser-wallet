'use client';

import { useForm } from 'react-hook-form';
import { Box, Button } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
//Internal app
import { getSchema } from '@/config';
import { InputOTP } from '@/components';

export default function authOtp() {
  const schema = getSchema(['otp']);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      otp: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    console.log(data);
    //Endpoint de validacion de otp
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        height: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <InputOTP
        name="otp"
        control={control}
        length={6}
        title="Por tu seguridad validaremos tu celular."
        text="Hemos enviado un código de autenticación por SMS a tu celular *6549. Ingresa el mismo a continuación."
      />
      <Button variant="contained" type="submit" sx={{ maxWidth: 283, width: '100%' }}>
        Continuar
      </Button>
    </Box>
  );
}
