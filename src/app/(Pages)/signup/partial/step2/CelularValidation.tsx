'use client';

import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, FormHelperText, Typography } from '@mui/material';
import { Info } from '@mui/icons-material';
import { MuiOtpInput } from 'mui-one-time-password-input';

//internal app
import { useRegisterStore, useUiStore } from '@/store';
import { useApi } from '@/hooks/useApi';
import { encryptForge } from '@/utils/toolHelper';
import { getSchema } from '@/config';
import { CardStep } from '..';

export default function CelularValidation() {
  const schema = getSchema(['otp']);
  const [optUuid, setOtpUuid] = useState<string>('');

  const { inc, dec, onboardingUuId, ONB_PHASES_TERMS } = useRegisterStore();

  const { setModalError } = useUiStore();

  const customApi = useApi();

  const [time, setTime] = useState<number>(60);

  const { handleSubmit, control } = useForm({
    defaultValues: { otp: '' },
    resolver: yupResolver(schema),
  });

  const timer = useCallback(async () => {
    const timerRef = setInterval(() => {
      setTime((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          return 0;
        }
      });
    }, 1000);
  }, [time]); //eslint-disable-line react-hooks/exhaustive-deps

  const requestTFACode = useCallback(async () => {
    customApi
      .post(`/onboarding/${onboardingUuId}/tfa`, { otpProcessCode: 'ONBOARDING_OTP' })
      .then((response) => {
        setOtpUuid(response.data.data.otpUuId);
      })
      .catch((error) => {
        setModalError({ title: 'Ocurrió un error', description: 'Intentalo nuevamente' });
      })
      .finally(() => {});
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = async (data: any) => {
    const code = encryptForge(data.otp);

    const request = {
      otpProcessCode: 'CHANGE_PASSWORD_OTP',
      otpUuId: optUuid,
      otpCode: code,
      currentPhaseCode: 'ONB_PHASES_OPT',
    };

    customApi
      .post(`/onboarding/${onboardingUuId}/validate/tfa`, request)
      .then((response) => {
        if (response.data.code === '200.00.000') {
          inc();
        }
      })
      .catch((error) => {
        setModalError({ title: 'Ocurrió un error', description: 'Intentalo nuevamente' });
      });
  };

  useEffect(() => {
    const timerRef = setInterval(() => {
      setTime((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          return 0;
        }
      });
    }, 1000);
    return () => clearTimeout(timerRef);
  }, [timer]);

  useEffect(() => {
    requestTFACode();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

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
              Ingresa el código de 4 dígitos que te enviamos por SMS al {ONB_PHASES_TERMS?.consultant.phoneNumber ?? ''}
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
            {time === 0 ? (
              <Typography variant="body2" mb={5}>
                De necesitarlo, ya puedes solicitar un nuevo código
              </Typography>
            ) : (
              <Typography variant="body2" mb={5} color="primary.main">
                Tiempo restante - 0:{time}
              </Typography>
            )}
            <Button
              onClick={() => {
                requestTFACode();
                setTime(60);
                timer();
              }}
              sx={{ color: 'primary.main', height: 20 }}
              disabled={time === 0 ? false : true}
            >
              Reenviar código
            </Button>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 / 2, mb: { xs: 3, sm: 0 } }}>
            <Button
              variant="outlined"
              onClick={() => {
                dec();
              }}
            >
              Anterior
            </Button>
            <Button variant="primary" type="submit">
              Siguiente
            </Button>
          </Box>
        </Box>
      </CardStep>
    </>
  );
}
