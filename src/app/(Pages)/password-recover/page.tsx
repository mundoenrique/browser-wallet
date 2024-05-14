'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Card } from '@mui/material';
//Internal
import OTP from './partial/OTP';
import { useApi } from '@/hooks/useApi';
import UpdatePass from './partial/UpdatePass';
import { useOtpStore, useUiStore, useUserStore } from '@/store';
import { OtpStore } from '@/interfaces';

export default function Recover() {
  const customApi = useApi();

  const { userId } = useUserStore((state) => state.user);

  const setModalError = useUiStore((state) => state.setModalError);

  const countdown = useOtpStore((state) => state.countdown);
  const counting = useOtpStore((state) => state.counting);
  const setCounting = useOtpStore((state) => state.setCounting);
  const setTime = useOtpStore((state) => state.setTime);
  const otpValid = useOtpStore((state) => state.otpValid);
  const setOtpUuid = useOtpStore((state) => state.setOtpUuid);

  const timerRef = useRef<NodeJS.Timeout>();
  const initialized = useRef<boolean>();

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

  const configRecoverRoutes = (page: OtpStore['otpValid']) => {
    const routes: { [key: string]: JSX.Element } = {
      OTP: <OTP handleResendOTP={requestTFACode} />,
      PASSWORD: <UpdatePass />,
    };
    const validatePage = page && routes[page];
    return validatePage || routes['OTP'];
  };

  return <Card variant="signup">{configRecoverRoutes(otpValid)}</Card>;
}
