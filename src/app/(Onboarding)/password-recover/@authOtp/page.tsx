'use client';

import { useForm } from 'react-hook-form';
import { Box, Button } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
//Internal app
import { getSchema } from '@/config';
import InputOTP from '@/components/form/InputOTP';

export default function AuthOtp() {
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
      <Button variant="contained" type="submit" sx={{ maxWidth: 284, width: '100%', mx: 'auto' }}>
        Continuar
      </Button>
    </Box>
  );
}
