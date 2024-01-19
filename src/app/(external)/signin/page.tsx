'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Link as LinkMui, Typography } from '@mui/material';
//Internal app
import logo from '%/images/yiro.svg';
import { getSchema } from '@/config';
import { InputText } from '@/components';

export default function Signin() {
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
          <Image src={logo} width={108} height={61} alt="Yiro" priority />
        </Box>
        <Box mb={8}>
          <Typography color="white" fontSize={14}>
            Dinero en tu bolsillo
          </Typography>
          <Typography color="success.main" fontSize={20} fontWeight={700}>
            ¡Sin complicaciones!
          </Typography>
        </Box>
        <Typography color="white" fontSize={20} fontWeight={700}>
          ¡Hola Andrea!
        </Typography>
        <Typography color="white">Para continuar, ingresa la contraseña de tu cuenta digital.</Typography>
      </Box>

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <InputText name="password" control={control} label="Contraseña" colorText="white" />
        <Box sx={{ width: '100%', py: 2, textAlign: 'center', mb: { xs: 6, sm: 12 } }}>
          <LinkMui component={Link} href="#" sx={{ color: 'white', textDecorationColor: 'white' }}>
            Recuperar contraseña
          </LinkMui>
        </Box>
        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{
            bgcolor: { sm: 'white' },
            color: { sm: 'inherit' },
            '&:hover': { bgcolor: { sm: 'white' } },
          }}
        >
          Ingresar
        </Button>
      </Box>
    </Box>
  );
}
