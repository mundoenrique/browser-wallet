'use client';

import { Card } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
//Internal
import Otp from './partial/OtpRecover';
import { api } from '@/utils/api';
import { OtpStore } from '@/interfaces';
import { NavExternal } from '@/components';
import UpdatePass from './partial/UpdatePass';
import { sendGTMEvent } from '@next/third-parties/google';
import { useHeadersStore, useOtpStore, useUiStore, useUserStore } from '@/store';

export default function Recover() {
  const {
    user: { userId },
  } = useUserStore();

  const { setModalError } = useUiStore();

  const host = useHeadersStore((state) => state.host);

  const otpValid = useOtpStore((state) => state.otpValid);

  const setOtpUuid = useOtpStore((state) => state.setOtpUuid);

  const [timeLeft, setTimeLeft] = useState<number>(60);

  const requestTFACode = useCallback(async () => {
    api
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

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft]); //eslint-disable-line react-hooks/exhaustive-deps

  const configRecoverRoutes = (page: OtpStore['otpValid']) => {
    const routes: { [key: string]: JSX.Element } = {
      OTP: <Otp handleResendOTP={requestTFACode} />,
      PASSWORD: <UpdatePass />,
    };
    const validatePage = page && routes[page];
    return validatePage ?? routes['OTP'];
  };

  return (
    <>
      <NavExternal
        image
        onClick={() => {
          sendGTMEvent({
            event: 'ga4.trackEvent',
            eventName: 'select_content',
            eventParams: {
              content_type: 'boton',
              section: 'Yiro :: recuperarContraseña',
              previous_section: 'Yiro :: login :: interno',
              selected_content: 'Volver',
              destination_page: `${host}/signin`,
            },
          });
        }}
      />
      <Card variant="signup">{configRecoverRoutes(otpValid)}</Card>
    </>
  );
}
