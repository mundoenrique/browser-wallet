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
import { InputPass, NavExternal } from '@/components';
import {
  useHeadersStore,
  useOtpStore,
  useRegisterStore,
  useUiStore,
  useUserStore,
  useAccessSessionStore,
  useKeyStore,
} from '@/store';

export default function Signin() {
  const theme = useTheme();

  const schema = getSchema(['password']);

  const router = useRouter();

  const { setOTPValid } = useOtpStore();

  const { backLink } = useHeadersStore();

  const { setModalError } = useUiStore();

  const jwePublicKey = useKeyStore((state) => state.jwePublicKey);

  const host = useHeadersStore((state) => state.host);

  const user = useRegisterStore((state) => state.user);

  const setUser = useUserStore((state) => state.setUser);

  const userId = useUserStore((state) => state.userId);

  const { setLoadingScreen, loadingScreen } = useUiStore();

  const setAccessSession = useAccessSessionStore((state) => state.setAccessSession);

  const [userData, setUserData] = useState<TUserDetail | null>(null);

  const { control, handleSubmit } = useForm({
    defaultValues: { password: '' },
    resolver: yupResolver(schema),
  });

  const closeSession = async () => {
    sessionStorage.clear();
    localStorage.clear();
    await api.delete('/redis', { data: { jwePublicKey, delParam: 'jwt', removeRedis: true } });

    sendGTMEvent({
      event: 'ga4.trackEvent',
      eventName: 'select_content',
      eventParams: {
        content_type: 'boton',
        section: 'Yiro :: login :: interno',
        previous_section: 'identify',
        selected_content: 'Volver a Somos Belcorp',
        destination_page: `${backLink}`,
      },
    });

    setTimeout(() => {
      window.open(backLink != '' ? backLink : (process.env.NEXT_PUBLIC_ALLOW_ORIGIN as string), '_self');
    }, 1000);
  };

  const onSubmit = async (data: any) => {
    const { password } = data;
    const requestData: TCredentials = {
      userId: userData?.userId ?? '',
      password: encryptForge(password),
    };
    setLoadingScreen(true);

    await api
      .post('/users/credentials', requestData)
      .then((response) => {
        const { status } = response;
        if (status === 200) {
          setAccessSession(true);
          const date = new Date();
          localStorage.setItem('sessionTime', date.toString());
          router.push('/dashboard');
        }
      })
      .catch((e) => {
        const { code } = e.response.data.data;
        if (code) {
          const eCode = code?.split('.').pop() ?? '';
          if (eCode === '9999') {
            router.push('/signout');
          } else {
            setModalError({ error: e });
          }
        }
      })
      .finally(() => {
        setLoadingScreen(false);
      });
  };

  const getUserDetails = async (id: string) => {
    await api
      .get(`/users/${id}`)
      .then((response) => {
        const userDetail = response.data.data;
        setUser(userDetail);
        setUserData(userDetail);
      })
      .catch((e) => {
        setModalError({ error: e });
      })
      .finally(() => {
        setLoadingScreen(false);
      });
  };

  useEffect(() => {
    const id = userId || user.userId;
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
        onClick={closeSession}
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
            <Typography variant="h6" color="white" fontWeight={700}>
              Tu aliado digital,
            </Typography>
            <Typography variant="h6" color="white" fontWeight={700}>
              ágil y seguro
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
                      selected_content: 'Olvidé mi contraseña',
                      destination_page: `${host}/password-recover`,
                    },
                  })
                }
              >
                Olvidé mi contraseña
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
                destination_page: `${host}/dashboard`,
              },
            })
          }
        >
          Ingresar
        </Button>
      </Box>
    </>
  );
}
