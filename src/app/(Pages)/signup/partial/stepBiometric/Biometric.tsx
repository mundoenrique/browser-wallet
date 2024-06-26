'use client';

import { useCallback, useEffect, useState } from 'react';
//Internal app
import { useRegisterStore, useUiStore } from '@/store';
import { api } from '@/utils/api';
import { Box, Button } from '@mui/material';

export default function Biometric() {
  const { loadingScreen, setModalError, setLoadingScreen } = useUiStore();
  const { updateStep } = useRegisterStore();

  const [url, setUrl] = useState<string>('');
  const [btnBack, setBtnBack] = useState<boolean>(false);

  const captureBiometrics = useCallback(() => {
    const requestFormData = {
      deviceDetect: 'web',
      identifier: 'a89ae7e8-bdc0-4aee-b4ec-23ca70d0d020',
    };
    setLoadingScreen(true);
    api
      .post('/onboarding/capturephotobiometrics ', requestFormData)
      .then((response) => {
        console.log('🚀 ~ capturephotobiometrics .then ~ response.data.data:', response.data.data);
        const { web } = response.data.data;
        setUrl(web.href);
        window.addEventListener('message', receiveMessage, false);
      })
      .catch((e) => {
        console.log('🚀 ~ captureBiometrics ~ e:', e);
        setModalError({ error: e });
      })
      .finally(() => {
        setLoadingScreen(false);
      });
  }, []);

  const receiveMessage = (event: any) => {
    let data = window.JSON.parse(event.data);
    console.log('🚀 ~ receiveMessage ~ data:', data);
    console.log('ID Verification Web was loaded in an iframe.');
    console.log('auth-token:', data.authorizationToken);
    console.log('event-type:', data.eventType);
    console.log('date-time:', data.dateTime);
    console.log('workflow-execution-id:', data.workflowExecutionId);
    console.log('account-id:', data.accountId);
    console.log('customer-internal-reference:', data.customerInternalReference);
    console.log('value:', data.payload.value);
    console.log('metainfo:', data.payload.metainfo);
    //Estamos verificando tu información
    if (data.payload.value === 'success') setLoadingScreen(true, { message: 'Estamos verificando tu información' });
    if (data.payload.value === 'error') setBtnBack(true);
  };

  useEffect(() => {
    captureBiometrics();
  }, []);

  useEffect(() => {
    if (loadingScreen) {
      const firstTimer = setTimeout(() => {
        setLoadingScreen(true, { message: 'Verificación correcta' });
        const secondTimer = setTimeout(() => {
          updateStep(4);
        }, 4000);
        return () => {
          setLoadingScreen(false);
          clearTimeout(secondTimer);
        };
      }, 4000);
      return () => {
        setLoadingScreen(false);
        clearTimeout(firstTimer);
      };
    }
  }, [updateStep, setLoadingScreen, loadingScreen]);

  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: { xs: 'flex-start', md: 'center' },
        gap: 2,
        height: '80vh',
      }}
    >
      {url && (
        <iframe
          src={url}
          title="Biometric"
          width="90%"
          height="90%"
          allow="camera;autoplay;fullscreen;clipboard-read;clipboard-write;accelerometer;gyroscope;magnetometer"
        ></iframe>
      )}
      {btnBack && (
        <Button
          variant="primary"
          onClick={() => {
            captureBiometrics();
          }}
        >
          Volver a validar identidad
        </Button>
      )}
    </Box>
  );
}
