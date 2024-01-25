'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Link as LinkMui, Typography } from '@mui/material';
//Internal app
import { getSchema } from '@/config';
import { InputPass } from '@/components';
import LogoGreen from '%/images/LogoGreen';

export default function Signin() {
  const btnRef: any = useRef(null);
  const schema = getSchema(['password']);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    console.log('🚀 ~ onSubmit ~ data:', data);
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: 320, zIndex: 1 }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Box mb={3}>
            <LogoGreen />
          </Box>
          <Box mb={8}>
            <Typography color="white" fontSize={14}>
              Dinero en tu bolsillo,
            </Typography>
            <Typography color="success.main" variant="h6" fontWeight={700}>
              ¡Sin complicaciones!
            </Typography>
          </Box>
          <Typography color="white" fontSize={20} fontWeight={700}>
            ¡Hola Andrea!
          </Typography>
          <Typography color="white">Para continuar, ingresa la contraseña de tu cuenta digital.</Typography>
          <Box sx={{ mt: 3, textAlign: 'start' }}>
            <InputPass name="password" control={control} label="Contraseña" colorText="white" />
            <Box sx={{ width: '100%', py: 2, textAlign: 'center', mb: { xs: 6, sm: 12 } }}>
              <LinkMui component={Link} href="/password-recover" sx={{ color: 'white', textDecorationColor: 'white' }}>
                Olvide mi contraseña
              </LinkMui>
            </Box>
          </Box>
        </Box>
        <Button ref={btnRef} variant="secondary" sx={{ display: { xs: 'none', sm: 'block' } }} type="submit" fullWidth>
          Ingresar
        </Button>
      </Box>
      <Button
        onClick={() => btnRef.current.click()}
        variant="contained"
        sx={{ display: { xs: 'block', sm: 'none' }, mb: '10%', width: 320 }}
        type="submit"
        fullWidth
      >
        Ingresar
      </Button>
    </>
  );
}
