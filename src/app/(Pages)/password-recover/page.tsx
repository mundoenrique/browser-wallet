'use client';

import { useCallback, useEffect, useState } from 'react';
//Internal
import OTP from './partial/OTP';
import UpdatePass from './partial/UpdatePass';
import { useApi } from '@/hooks/useApi';
import { useRegisterStore, useUiStore } from '@/store';

export default function Recover() {
  const customApi = useApi();

  const { getUserId } = useRegisterStore();
  const { setLoadingScreen, loadingScreen, setModalError } = useUiStore();

  const [otpValid, setOtpValid] = useState<boolean>(false);

  const requestTFACode = useCallback(async () => {
    setLoadingScreen(true);
    const userId: string = getUserId();
    customApi
      .post(`/users/${userId}/tfa`, { otpProcessCode: 'CHANGE_PASSWORD_OTP' })
      .then((response) => {
        console.log('🚀 ~ .then ~ response:', response);
      })
      .catch((error) => {
        console.log('🚀 ~ requestTFACode ~ error:', error);
        setModalError({ title: 'Ocurrió un error', description: 'Intentalo nuevamente' });
      })
      .finally(() => {
        setLoadingScreen(false);
      });
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    requestTFACode();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return <>{otpValid ? <UpdatePass /> : <OTP setOTP={setOtpValid} />}</>;
}
