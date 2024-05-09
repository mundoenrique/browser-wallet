'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Card } from '@mui/material';
//Internal
import OTP from './partial/OTP';
import { useApi } from '@/hooks/useApi';
import UpdatePass from './partial/UpdatePass';
import { useOtpStore, useUiStore, useUserStore } from '@/store';

export default function Recover() {
  const customApi = useApi();

  const {
    user: { userId },
  } = useUserStore();
  const { setModalError } = useUiStore();
  const { countdown, counting, setCounting, setTime, otpValid, otpUuid, setOtpUuid } = useOtpStore();

  const initialized = useRef<boolean>(false);
  const timerRef = useRef<any>();

  const requestTFACode = useCallback(async () => {
    customApi
      .post(`/users/${userId}/tfa`, { otpProcessCode: 'CHANGE_PASSWORD_OTP' })
      .then((response) => {
        const { data, status } = response;
        if (status === 200) {
          setOtpUuid(data.data.otpUuId);
        }
      })
      .catch((e) => {
        setModalError({ error: e });
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

  const configRecoverRoutes = (page: any) => {
    const routes: { [key: string]: any } = {
      OTP: <OTP handleResendOTP={requestTFACode} />,
      PASSWORD: <UpdatePass />,
    };
    return routes[page] || routes['OTP'];
  };

  return <Card variant="signup">{configRecoverRoutes(otpValid)}</Card>;
}
