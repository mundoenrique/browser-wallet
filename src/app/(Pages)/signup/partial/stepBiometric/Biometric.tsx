'use client';

import { Box, Button } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
//Internal app
import { api } from '@/utils/api';

import { useRegisterStore, useUiStore } from '@/store';

export default function Biometric() {
  const { setModalError, setLoadingScreen } = useUiStore();
  const { updateStep, updateControl } = useRegisterStore();

  const [url, setUrl] = useState<string>('');
  const [btnBack, setBtnBack] = useState<boolean>(false);

  const hasRun = useRef(false);

  const validateView = useCallback(() => {
    const firstTimer = setTimeout(() => {
      setLoadingScreen(true, { message: 'Verificación correcta' });
      const secondTimer = setTimeout(() => {
        updateStep(6);
        setLoadingScreen(false);
      }, 4000);
      return () => {
        clearTimeout(secondTimer);
      };
    }, 4000);
    return () => {
      clearTimeout(firstTimer);
    };
  }, [setLoadingScreen, updateStep]);

  // eslint-disable-next-line react-hooks/exhaustive-deps

  const receiveMessage = (event: any) => {
    if (typeof event.data !== 'string') return;

    let data = window.JSON.parse(event.data);

    if (data.payload !== undefined) {
      if (data.payload.value === 'success') {
        validateView();
        window.removeEventListener('message', receiveMessage);
      }

      if (data.payload.value === 'error') setBtnBack(true);
    }
  };

  const captureBiometrics = useCallback(() => {
    window.addEventListener('message', receiveMessage, false);
    updateControl({ accountId: '', workflowId: '' });
    setUrl('');
    const requestFormData = {
      deviceDetect: 'web',
    };
    setLoadingScreen(true);
    api
      .post('/onboarding/capturephotobiometrics ', requestFormData)
      .then((response) => {
        const { web, account, workflowExecution } = response.data.data;
        setUrl(web.href);
        updateControl({ accountId: account.id, workflowId: workflowExecution.id });
      })
      .catch((e) => {
        setModalError({ error: e });
      })
      .finally(() => {
        setLoadingScreen(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!hasRun.current) {
      captureBiometrics();
      hasRun.current = true;
    }
  }, [captureBiometrics]);

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
