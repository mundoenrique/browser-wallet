'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Link as LinkMui, Skeleton, Typography, capitalize, useMediaQuery, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
//Internal app
import { getSchema } from '@/config';
import LogoGreen from '%/images/LogoGreen';
import { InputPass, ModalResponsive } from '@/components';
import { useApi } from '@/hooks/useApi';
import { TUserDetail } from '@/interfaces';
import { encryptForge } from '@/utils/toolHelper';
import { useUiStore } from '@/store';

export default function Signin() {
  const customApi = useApi();
  const theme = useTheme();
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [userData, setUserData] = useState<TUserDetail | null>(null);
  const { setLoadingScreen, loadingScreen } = useUiStore();
  const schema = getSchema(['password']);

  const { control, handleSubmit } = useForm({
    defaultValues: { password: '' },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    console.log('🚀 ~ onSubmit ~ data:', data);
    const { password } = data;
    const payload = {
      // userId: userData?.userId,
      userId: '59c6078b-8298-4448-b23d-ddb2111b5be9',
      password: encryptForge('claveDificil'),
    };
    console.log('🚀 ~ handleSignin ~ payload:', payload);
    setLoadingScreen(true);
    await customApi
      .post('/users/credentials', payload)
      .then((response) => {
        console.log('🚀 ~ handleSignin ~ response:', response);
        const { status } = response;
        if (status === 200) {
          router.push('/dashboard');
        }
      })
      .catch((error) => {
        throw new Error('Error in apiGee request handling: ' + (error as Error).message);
      })
      .finally(() => {
        setLoadingScreen(false);
      });
  };

  const getUserDetails = async (userId: string) => {
    setLoadingScreen(true);
    await customApi
      .get(`/users/${userId}`)
      .then((response) => {
        console.log('🚀 ~ getUserDetails ~ response:', response.data);
        setUserData(response.data.data);
      })
      .catch((error) => {
        throw new Error('Error in apiGee request handling: ' + (error as Error).message);
      })
      .finally(() => {
        setLoadingScreen(false);
      });
  };

  useEffect(() => {
    getUserDetails('59c6078b-8298-4448-b23d-ddb2111b5be9');
  }, []);

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
            <Typography variant="body2" color="white">
              Dinero en tu bolsillo,
            </Typography>
            <Typography color="success.main" variant="h6">
              ¡Sin complicaciones!
            </Typography>
          </Box>
          {userData ? (
            <Typography variant="h6" color="white" sx={{ textTransform: 'capitalize' }}>
              ¡Hola {userData?.firstName}!
            </Typography>
          ) : (
            <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
          )}
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
          disabled={loadingScreen}
        >
          Ingresar
        </Button>
      </Box>

      <ModalResponsive open={open} handleClose={() => setOpen(false)}>
        <Typography py={2} fontWeight={700}>
          Signin
        </Typography>
        <Typography textAlign="center">{errorMessage}</Typography>
      </ModalResponsive>
    </>
  );
}
