'use client';

import { useCallback, useEffect, useState } from 'react';
//Internal app
import { useRegisterStore, useUiStore } from '@/store';
import { api } from '@/utils/api';
import { Box, Button } from '@mui/material';

export default function Biometric() {
  const { loadingScreen, setModalError, setLoadingScreen } = useUiStore();
  const { updateStep, updateControl } = useRegisterStore();

  const [url, setUrl] = useState<string>('');
  const [btnBack, setBtnBack] = useState<boolean>(false);

  const receiveMessage = useCallback(
    (event: any) => {
      let data = window.JSON.parse(event.data);
      if (data.payload.value === 'success') setLoadingScreen(true, { message: 'Estamos verificando tu información' });
      if (data.payload.value === 'error') setBtnBack(true);
    },
    [setLoadingScreen, setBtnBack]
  );

  const captureBiometrics = useCallback(() => {
    setUrl('');
    const requestFormData = {
      deviceDetect: 'web',
      identifier: 'a89ae7e8-bdc0-4aee-b4ec-23ca70d0d020',
    };
    setLoadingScreen(true);
    api
      .post('/onboarding/capturephotobiometrics ', requestFormData)
      .then((response) => {
        const { web, account, workflowExecution } = response.data.data;
        setUrl(web.href);
        updateControl({ accountId: account.id, workflowId: workflowExecution.id });
        window.addEventListener('message', receiveMessage, false);
      })
      .catch((e) => {
        setModalError({ error: e });
      })
      .finally(() => {
        setLoadingScreen(false);
      });
  }, [receiveMessage, setLoadingScreen, setModalError, updateControl]);

  useEffect(() => {
    captureBiometrics();
  }, [captureBiometrics]);

  useEffect(() => {
    if (loadingScreen) {
      const firstTimer = setTimeout(() => {
        setLoadingScreen(true, { message: 'Verificación correcta' });
        const secondTimer = setTimeout(() => {
          updateStep(6);
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
        borderRadius: '10px',
      }}
    >
      {url && (
        <iframe
          src={url}
          title="Biometric"
          width="90%"
          height="90%"
          allow="camera;autoplay;fullscreen;clipboard-read;clipboard-write;accelerometer;gyroscope;magnetometer"
          style={{ borderRadius: '10px', borderWidth: '0px' }}
        ></iframe>
      )}
      {btnBack && (
        <Button
          variant="primary"
          onClick={() => {
            captureBiometrics();
            setBtnBack(false);
          }}
        >
          Volver a validar identidad
        </Button>
      )}
    </Box>
  );
}
