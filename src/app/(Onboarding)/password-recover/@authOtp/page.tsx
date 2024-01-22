'use client';

import { useForm } from 'react-hook-form';
import { Box, Button } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
//Internal app
import { getSchema } from '@/config';
import { InputOTP } from '@/components';

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
        title="Activación de doble factor"
        text="Hemos enviado por tu seguridad un código SMS a tu celular *6549. Ingrésalo aquí."
      />
      <Button variant="contained" type="submit" sx={{ maxWidth: 284, width: '100%' }}>
        Continuar
      </Button>
    </Box>
  );
}
