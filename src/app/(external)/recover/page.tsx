'use client';

import { useForm } from 'react-hook-form';
import { Box, Button, Stack } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
//Internal app
import { getSchema } from '@/config';
import { CardOnboarding, InputOTP, NavExternal } from '@/components';

export default function Recover() {
  const schema = getSchema(['otp']);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      otp: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    console.log(data);
  };

  return (
    <>
      <NavExternal image relative />
      <CardOnboarding>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack
            spacing={20}
            sx={{
              alignItems: 'center',
            }}
          >
            <InputOTP
              name="otp"
              control={control}
              length={4}
              title="Por tu seguridad validaremos tu celular."
              text="Hemos enviado un código de autenticación por SMS a tu celular *6549. Ingresa el mismo a continuación."
            />
            <Button variant="contained" type="submit" sx={{ maxWidth: 283, width: '100%' }}>
              Continuar
            </Button>
          </Stack>
        </Box>
      </CardOnboarding>
    </>
  );
}
