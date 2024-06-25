'use client';

import { useCallback, useEffect, useState } from 'react';
//Internal app
import { useRegisterStore, useUiStore } from '@/store';
import { api } from '@/utils/api';
import { encryptForge } from '@/utils/toolHelper';
import { Box } from '@mui/material';

export default function Biometric() {
  const { setModalError, setLoadingScreen } = useUiStore();
  const { inc } = useRegisterStore();

  const [url, setUrl] = useState<string>('');

  const captureBiometrics = useCallback(() => {
    const requestFormData = {
      deviceDetect: 'web',
      identifier: 'a89ae7e8-bdc0-4aee-b4ec-23ca70d0d020',
    };
    setLoadingScreen(true);
    api
      .post('/onboarding/capturephotobiometrics ', requestFormData)
      .then((response) => {
        console.log('🚀 ~ .then ~ response:', response.data.data);
        const { web } = response.data.data;
        setUrl(web.href);
        // inc();
      })
      .catch((e) => {
        console.log('🚀 ~ captureBiometrics ~ e:', e);
        setModalError({ error: e });
      })
      .finally(() => {
        setLoadingScreen(false);
      });
  }, []);

  useEffect(() => {
    captureBiometrics();
  }, []);

  return (
    <Box sx={{ width: '100%', height: '84vh' }}>
      {url && (
        <iframe
          src={url}
          title="Biometric"
          width="100%"
          height="100%"
          allow="camera;autoplay;fullscreen;clipboard-read;clipboard-write;accelerometer;gyroscope;magnetometer"
        ></iframe>
      )}
    </Box>
  );
}
