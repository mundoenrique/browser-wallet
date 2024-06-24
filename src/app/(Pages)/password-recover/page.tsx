'use client';

import { Card } from '@mui/material';
import { useCallback, useEffect, useRef } from 'react';
//Internal
import OTP from './partial/OTP';
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

  const { host } = useHeadersStore();

  const { setModalError } = useUiStore();

  const { countdown, counting, setCounting, setTime, otpValid, setOtpUuid } = useOtpStore();

  const timerRef = useRef<NodeJS.Timeout>();
  const initialized = useRef<boolean>();

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
