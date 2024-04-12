'use client';

import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress, FormHelperText, Typography } from '@mui/material';
import { MuiOtpInput } from 'mui-one-time-password-input';

//internal app
import { getSchema } from '@/config';
import { useRegisterStore, useUiStore, useOtpStore } from '@/store';

import { CardStep } from '..';

import { useApi } from '@/hooks/useApi';
import { decryptForge, encryptForge } from '@/utils/toolHelper';
import { Info } from '@mui/icons-material';
import { ModalError } from '@/components';

export default function CelularValidation() {
  const schema = getSchema(['otp']);
  const [optUuid, setOtpUuid] = useState<string>('');
  const [loadingTfa, setLoadingTfa] = useState<boolean>(false);
  const { inc, dec, onboardingUuId, ONB_PHASES_TERMS } = useRegisterStore();

  const { otpTimeLeft, countdown } = useOtpStore();

  const customApi = useApi();

  const { handleSubmit, control } = useForm({
    defaultValues: { otp: '' },
    resolver: yupResolver(schema),
  });

  const updateTimer = useCallback(() => {
    if (otpTimeLeft > 0) {
      countdown();
    } else {
      return 0;
    }
    // const timerId = setInterval(updateTimer, 1000);
  }, [countdown, otpTimeLeft]);

  const requestTFACode = useCallback(async () => {
    setLoadingTfa(true);
    customApi
      .post(`/onboarding/${onboardingUuId}/tfa`, { otpProcessCode: 'ONBOARDING_OTP' })
      .then((response) => {
        console.log('send OTP', response);
        setOtpUuid(response.data.data.otpUuId);
        setInterval(updateTimer, 1000);
      })
      .catch((error) => {
        console.log('get error tfa', error);
      })
      .finally(() => {
        setLoadingTfa(false);
      });
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
        console.log(response);
        if (response.data.code === '200.00.000') {
          inc();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    requestTFACode();
  }, [requestTFACode]);

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
                    TextFieldsProps={{ disabled: loadingTfa }}
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
            {loadingTfa ? <CircularProgress /> : <Typography>Tiempo restante - {otpTimeLeft} </Typography>}
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
