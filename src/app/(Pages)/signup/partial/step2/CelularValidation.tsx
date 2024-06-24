'use client';

import Info from '@mui/icons-material/InfoOutlined';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { sendGTMEvent } from '@next/third-parties/google';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Button, FormHelperText, Snackbar, Typography } from '@mui/material';
//internal app
import { CardStep } from '..';
import { api } from '@/utils/api';
import { getSchema } from '@/config';
import { encryptForge, handleMaskOtp } from '@/utils/toolHelper';
import { useHeadersStore, useOtpStore, useRegisterStore, useUiStore } from '@/store';

export default function CelularValidation() {
  const schema = getSchema(['otp']);

  const { host } = useHeadersStore();

  const resetOtp = useOtpStore((state) => state.reset);

  const { setModalError, setLoadingScreen } = useUiStore();

  const { inc, dec, onboardingUuId, ONB_PHASES_TERMS } = useRegisterStore();

  const { timeLeft, countdown, counting, setCounting, setTime, otpUuid, setOtpUuid } = useOtpStore();

  const [open, setOpen] = useState(false);

  const timerRef = useRef<any>();

  const initialized = useRef<boolean>(false);

  const { handleSubmit, control, reset } = useForm({
    defaultValues: { otp: '' },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    sendGTMEvent({
      event: 'ga4.trackEvent',
      eventName: 'page_view_ga4',
      eventParams: {
        page_location: `${host}/signup`,
        page_title: 'Yiro :: onboarding :: step2',
        page_referrer: `${host}/identify`,
        section: 'Yiro :: onboarding :: step2',
        previous_section: 'Yiro :: onboarding :: step1',
      },
    });
  }, [host]);

  const requestTFACode = useCallback(async () => {
    api
      .post(`/onboarding/${onboardingUuId}/tfa`, { otpProcessCode: 'ONBOARDING_OTP' })
      .then((response) => {
        setOtpUuid(response.data.data.otpUuId);
      })
      .catch((e) => {
        setModalError({ error: e });
      })
      .finally(() => {});
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = async (data: any) => {
    const code = encryptForge(data.otp);

    const request = {
      otpProcessCode: 'ONBOARDING_OTP',
      otpUuId: otpUuid,
      otpCode: code,
      currentPhaseCode: 'ONB_PHASES_OPT',
    };
    setLoadingScreen(true);
    api
      .post(`/onboarding/${onboardingUuId}/validate/tfa`, request)
      .then((response) => {
        if (response.data.code === '200.00.000') {
          inc();
          resetOtp();
        }
      })
      .catch((e) => {
        setModalError({ error: e });
      })
      .finally(() => {
        setLoadingScreen(false);
      });

    reset();
  };

  const timer = useCallback(async () => {
    timerRef.current = setInterval(() => countdown(), 1000);
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!counting && !initialized.current) {
      (async () => {
        await requestTFACode();
      })();
      setTime(60);
      timer();
      setCounting(true);
      initialized.current = true;
    } else if (counting && !initialized.current) {
      timer();
      initialized.current = true;
    }
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (timeLeft === 0 && counting) {
      clearInterval(timerRef.current);
    }
  }, [timeLeft]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <CardStep stepNumber="2">
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}
        >
          <Box sx={{ textAlign: 'center', mb: 5, justifyContent: 'center' }}>
            <Typography fontWeight={700} mb={3}>
              Por tu seguridad validaremos tu celular
            </Typography>
            <Typography variant="body2" mb="12px">
              Ingresa el código de 4 dígitos que te enviamos por SMS al{' '}
              {`+51 *** *** ${handleMaskOtp(ONB_PHASES_TERMS?.consultant.phoneNumber)}` ?? ''}
            </Typography>
            <Controller
              name={'otp'}
              control={control}
              rules={{ validate: (value: any) => value.length === length }}
              render={({ field, fieldState: { error } }: any) => (
                <Box sx={{ justifyContent: 'center' }}>
                  <MuiOtpInput
                    sx={{
                      p: 0,
                      gap: 3 / 2,
                      '&>.MuiFormControl-root>.MuiInputBase-root': { width: '46px', fontSize: 25, fontWeight: 700 },
                      justifyContent: 'center',
                    }}
                    {...field}
                    length={4}
                  />
                  <FormHelperText
                    sx={{
                      height: 20,
                      ml: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    id={`otp-helperText`}
                    error
                  >
                    {error ? (
                      <>
                        <Info fontSize="small" sx={{ mr: 1 }} /> {error.message}
                      </>
                    ) : (
                      <></>
                    )}
                  </FormHelperText>
                </Box>
              )}
            />
            {timeLeft === 0 ? (
              <Typography variant="body2" mb={5}>
                De necesitarlo, ya puedes solicitar un nuevo código
              </Typography>
            ) : (
              <Typography variant="body2" mb={5} color="primary.main">
                Tiempo restante - 0:{timeLeft}
              </Typography>
            )}
            <Button
              onClick={async () => {
                await requestTFACode();
                setTime(60);
                timer();
                setCounting(true);
                reset();
                setOpen(!open);
                sendGTMEvent({
                  event: 'ga4.trackEvent',
                  eventName: 'select_content',
                  eventParams: {
                    content_type: 'boton',
                    section: 'Yiro :: onboarding :: step2',
                    previous_section: 'Yiro :: onboarding :: step1',
                    selected_content: 'Reenviar código',
                    destination_page: `${host}/signup`,
                  },
                });
              }}
              sx={{ color: 'primary.main', height: 20 }}
              disabled={timeLeft === 0 ? false : true}
            >
              Reenviar código
            </Button>
          </Box>

          <Snackbar
            sx={{ '&>.MuiPaper-root': { bgcolor: 'white', borderRadius: '4px', color: 'initial', boxShadow: 2 } }}
            open={open}
            autoHideDuration={3000}
            onClose={() => setOpen(false)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            message="🎰 Nuevo código enviado"
            key={'bottom' + 'center'}
          />

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 / 2, mb: { xs: 3, sm: 0 } }}>
            <Button
              variant="outlined"
              onClick={() => {
                dec();
                sendGTMEvent({
                  event: 'ga4.trackEvent',
                  eventName: 'select_content',
                  eventParams: {
                    content_type: 'boton',
                    section: 'Yiro :: onboarding :: step2',
                    previous_section: 'Yiro :: onboarding :: step1',
                    selected_content: 'Anterior',
                    destination_page: `${host}/signup`,
                  },
                });
              }}
            >
              Anterior
            </Button>
            <Button
              variant="primary"
              type="submit"
              onClick={() => {
                sendGTMEvent({
                  event: 'ga4.trackEvent',
                  eventName: 'select_content',
                  eventParams: {
                    content_type: 'boton',
                    section: 'Yiro :: onboarding :: step2',
                    previous_section: 'Yiro :: onboarding :: step1',
                    selected_content: 'Siguiente',
                    destination_page: `${host}/signup`,
                  },
                });
              }}
            >
              Siguiente
            </Button>
          </Box>
        </Box>
      </CardStep>
    </>
  );
}
