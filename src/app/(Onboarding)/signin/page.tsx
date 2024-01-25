'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Link as LinkMui, Typography, useMediaQuery, useTheme } from '@mui/material';
//Internal app
import { getSchema } from '@/config';
import { InputPass } from '@/components';
import LogoGreen from '%/images/LogoGreen';

export default function Signin() {
  const theme = useTheme();
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
    <Box sx={{ width: 320, zIndex: 1, mb: { xs: '10%', sm: '0' } }}>
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
      </Box>

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <InputPass name="password" control={control} label="Contraseña" colorText="white" />
        <Box sx={{ width: '100%', py: 2, textAlign: 'center', mb: { xs: 6, sm: 12 } }}>
          <LinkMui component={Link} href="/password-recover" sx={{ color: 'white', textDecorationColor: 'white' }}>
            Olvide mi contraseña
          </LinkMui>
        </Box>
        <Button
          variant={useMediaQuery(theme.breakpoints.down('sm')) ? 'contained' : 'secondary'}
          type="submit"
          fullWidth
        >
          Ingresar
        </Button>
      </Box>
    </Box>
  );
}
