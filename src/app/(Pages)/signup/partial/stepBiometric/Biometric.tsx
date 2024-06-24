'use client';

import { useCallback, useEffect } from 'react';
//Internal app
import { useRegisterStore, useUiStore } from '@/store';
import { api } from '@/utils/api';
import { encryptForge } from '@/utils/toolHelper';

export default function Biometric() {
  const { setModalError, setLoadingScreen } = useUiStore();
  const { inc } = useRegisterStore();

  const captureBiometrics = useCallback(() => {
    const requestFormData = {
      deviceDetect: 'web',
      identifier: 'a89ae7e8-bdc0-4aee-b4ec-23ca70d0d020',
    };
    setLoadingScreen(true);
    api
      .post('/onboarding/capturephotobiometrics ', requestFormData)
      .then((response) => {
        console.log('🚀 ~ .then ~ response:', response);
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
    <>
      <h1>Biometric</h1>
    </>
  );
}
