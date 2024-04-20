'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
//Internal
import OTP from './partial/OTP';
import UpdatePass from './partial/UpdatePass';
import { useApi } from '@/hooks/useApi';
import { useOtpStore, useRegisterStore, useUiStore } from '@/store';

export default function Recover() {
  const customApi = useApi();

  const { getUserId } = useRegisterStore();
  const { setLoadingScreen, loadingScreen, setModalError } = useUiStore();
  const { timeLeft, countdown, counting, setCounting, setTime } = useOtpStore();

  const initialized = useRef<boolean>(false);
  const timerRef = useRef<any>();
  const [otpValid, setOtpValid] = useState<boolean>(false);
  const [optUuid, setOtpUuid] = useState<string>('');

  const requestTFACode = useCallback(async () => {
    const userId: string = getUserId();
    customApi
      .post(`/users/${userId}/tfa`, { otpProcessCode: 'CHANGE_PASSWORD_OTP' })
      .then((response) => {
        const { data, status } = response;
        if (status === 200) {
          setOtpUuid(data.data.otpUuId);
        }
      })
      .catch((error) => {
        setModalError({ title: 'Algo salió mal', description: 'Intentalo nuevamente' });
      });
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

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

  return <>{otpValid ? <UpdatePass /> : <OTP setOTP={setOtpValid} optUuid={optUuid} />}</>;
}
