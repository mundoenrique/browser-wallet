'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Link as LinkMui, Typography, useMediaQuery, useTheme } from '@mui/material';
//Internal app
import { getSchema } from '@/config';
import LogoGreen from '%/images/LogoGreen';
import { InputPass, ModalResponsive } from '@/components';

export default function Signin() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const router = useRouter();
  const schema = getSchema(['password']);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    console.log('🚀 ~ onSubmit ~ data:', data);
    if (data.password !== '123456') {
      setOpen(true);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <>
      <Box
        component="form"
        data-testid="signin-form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: { xs: '0 1 0', sm: 0 },
          justifyContent: 'space-between',
          width: 320,
          zIndex: 1,
          margin: { xs: 'initial', sm: 'auto' },
        }}
      >
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
            <Box sx={{ width: '100%', py: 2, textAlign: 'center', mb: { xs: 6, sm: 0 } }}>
              <LinkMui component={Link} href="/password-recover" sx={{ color: 'white', textDecorationColor: 'white' }}>
                Olvide mi contraseña
              </LinkMui>
            </Box>
          </Box>
        </Box>
        <Button
          variant={useMediaQuery(theme.breakpoints.down('sm')) ? 'contained' : 'secondary'}
          sx={{ mb: '10%' }}
          type="submit"
          fullWidth
        >
          Ingresar
        </Button>
      </Box>

      <ModalResponsive open={open} handleClose={() => setOpen(false)}>
        <>
          <Typography py={2} fontWeight={700}>
            Signin
          </Typography>
          <Typography textAlign="center">Contraseña incorrecta.</Typography>
        </>
      </ModalResponsive>
    </>
  );
}
