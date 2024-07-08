'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { sendGTMEvent } from '@next/third-parties/google';
import { Box, Button, Link as LinkMui, Skeleton, Typography, useMediaQuery, useTheme } from '@mui/material';
//Internal app
import { api } from '@/utils/api';
import { getSchema } from '@/config';
import LogoGreen from '%/images/LogoGreen';
import { encryptForge } from '@/utils/toolHelper';
import { TCredentials, TUserDetail } from '@/interfaces';
import { InputPass, ModalResponsive, NavExternal } from '@/components';
import { useHeadersStore, useOtpStore, useRegisterStore, useUiStore, useUserStore, useAccessSessionStore } from '@/store';

export default function Signin() {
  const theme = useTheme();

  const schema = getSchema(['password']);

  const router = useRouter();

  const setAccessSession = useAccessSessionStore((state) => state.setAccessSession);

  const user = useRegisterStore((state) => state.user);

  const { setOTPValid } = useOtpStore();

  const { backLink } = useHeadersStore();

  const { setModalError } = useUiStore();

  const { setUser, userId } = useUserStore();

  const host = useHeadersStore((state) => state.host);

  const { setLoadingScreen, loadingScreen } = useUiStore();

  const [errorMessage] = useState<string>('');

  const [open, setOpen] = useState<boolean>(false);

  const [userData, setUserData] = useState<TUserDetail | null>(null);

  const { control, handleSubmit } = useForm({
    defaultValues: { password: '' },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    const { password } = data;
    const requestData: TCredentials = {
      userId: userData?.userId || '',
      password: encryptForge(password),
    };
    setLoadingScreen(true);

    await api
      .post('/users/credentials', requestData)
      .then((response) => {
        const { status } = response;
        if (status === 200) {
          setAccessSession(true)
          const date = new Date();
          localStorage.setItem('sessionTime', date.toString());
          router.push('/dashboard');
        }
      })
      .catch((e) => {
        setModalError({ error: e });
      })
      .finally(() => {
        setLoadingScreen(false);
      });
  };

  const getUserDetails = async (id: string) => {
    await api
      .get(`/users/${id}`)
      .then((response) => {
        setUser(response.data.data);
        setUserData(response.data.data);
      })
      .catch((e) => {
        setModalError({ error: e });
      })
      .finally(() => {
        setLoadingScreen(false);
      });
  };

  useEffect(() => {
    const id = userId ? userId : user.userId;
    getUserDetails(id);
    setOTPValid('OTP');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    sendGTMEvent({
      event: 'ga4.trackEvent',
      eventName: 'page_view_ga4',
      eventParams: {
        page_location: `${host}/signin/interno`,
        page_title: 'Yiro :: login :: interno',
        page_referrer: `${host}/identify`,
        section: 'Yiro :: login :: interno',
        previous_section: 'somosbelcorp',
      },
    });
  }, [host]);

  return (
    <>
      <NavExternal
        color="white"
        closeApp
        onClick={() => {
          sendGTMEvent({
            event: 'ga4.trackEvent',
            eventName: 'select_content',
            eventParams: {
              content_type: 'boton',
              section: 'Yiro :: login :: interno',
              previous_section: 'identify',
              selected_content: 'Volver a ésika Conmigo',
              destination_page: `${backLink}`,
            },
          });
        }}
      />
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
            <Skeleton variant="text" sx={{ fontSize: '1.2rem' }} />
          )}
          <Typography color="white">Para continuar, ingresa la contraseña de tu cuenta digital.</Typography>
          <Box sx={{ mt: 3, textAlign: 'start' }}>
            <InputPass name="password" control={control} label="Contraseña" colorText="white" />
            <Box sx={{ width: '100%', py: 2, textAlign: 'center', mb: { xs: 6, sm: 0 } }}>
              <LinkMui
                component={Link}
                href="/password-recover"
                sx={{ color: 'white', textDecorationColor: 'white' }}
                onClick={() =>
                  sendGTMEvent({
                    event: 'ga4.trackEvent',
                    eventName: 'select_content',
                    eventParams: {
                      content_type: 'boton',
                      section: 'Yiro :: login :: interno',
                      previous_section: 'somosbelcorp',
                      selected_content: 'Olvide mi contraseña',
                      destination_page: `${host}/password-recover`,
                    },
                  })
                }
              >
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
          onClick={() =>
            sendGTMEvent({
              event: 'ga4.trackEvent',
              eventName: 'select_content',
              eventParams: {
                content_type: 'boton',
                section: 'Yiro :: login :: interno',
                previous_section: 'somosbelcorp',
                selected_content: 'Ingresar',
                destination_page: '/dashboard',
              },
            })
          }
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
