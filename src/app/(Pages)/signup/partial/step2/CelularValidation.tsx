'use client';

import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button } from '@mui/material';
//internal app
import { getSchema } from '@/config';
import { useRegisterStore, useUiStore } from '@/store';
import InputOTP from '@/components/form/InputOTP';
import { CardStep } from '..';
import { ModalError } from '@/components';

export default function CelularValidation() {
  const schema = getSchema(['otp']);
  const [optUuid, setOtpUuid] = useState<string>('');
  const { inc, dec, onboardingUuid } = useRegisterStore();
  const { setLoadingScreen } = useUiStore();
  const [requestError, setRequestError] = useState<boolean>(false);

  const { handleSubmit, control } = useForm({
    defaultValues: { otp: '' },
    resolver: yupResolver(schema),
  });

  const requestTFACode = useCallback(async () => {
    setLoadingScreen(true);

    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    setRequestError(true);
    //TODO: Validar documentacion
    //https://sandbox-api.novopayment.com/api/v0/onboarding/{onboardingId}/tfa
    await fetch(`/api/v1/onboarding/tfa/${onboardingUuid}`, {
      method: 'POST',
      body: '{"otpProcessCode":"CHANGE_PASSWORD"}',
    }).then(async (response) => {
      const data = await response.json();
      setOtpUuid(data.data.otpUuId);
    });

    setLoadingScreen(false);
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = async (data: any) => {
    const code = data.otp; //TODO: encode otp input

    const request = {
      otpProcessCode: 'CHANGE_PASSWORD_OTP',
      otpUuId: optUuid,
      otpCode: code,
      currentPhaseCode: 'ONB_PHASES_OPT',
    };

    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });

    await fetch(`/api/v1/onboarding/tfa/validate/${onboardingUuid}`, {
      method: 'POST',
      body: JSON.stringify(request),
    })
      .then(() => {
        inc();
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
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <InputOTP
              name="otp"
              title="Por tu seguridad validaremos tu celular"
              text="Ingresa el código de 4 dígitos que te enviamos por SMS al *** *** 1214"
              length={4}
              control={control}
            />
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
      {requestError && <ModalError title="otp" description="error" />}
    </>
  );
}
