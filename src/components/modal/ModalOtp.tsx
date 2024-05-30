'use client';

import { useForm } from 'react-hook-form';
import { Box, Button } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useCallback, useRef } from 'react';
//Internal app
import { api } from '@/utils/api';
import { getSchema } from '@/config';
import InputOTP from '../form/InputOTP';
import { ModalOtpProps } from '@/interfaces';
import ModalResponsive from './ModalResponsive';
import { useUiStore, useOtpStore, useUserStore } from '@/store';

/**
 * Reusable modal to request verification code
 *
 * @param handleClose - Function of the modal to close it with the X.
 * @param open - State of the modal to show it or not.
 * @param onSubmit - Function that sends the data obtained in the form.
 * @param closeModal - Function used to close the modal with a button in the account deletion flow.
 * @param title - Title of the form.
 * @param textButon - Text for the main button.
 * @param processCode - Identify value of OTP.
 * @returns Json with the verification code
 */
export default function ModalOtp(props: ModalOtpProps): JSX.Element {
  const { handleClose, open, onSubmit, closeApp, title, textButton, processCode } = props;

  const { setModalError } = useUiStore();
  const { user, getUserPhone } = useUserStore();
  const { countdown, counting, setCounting, setTime, setOtpUuid } = useOtpStore();

  const timerRef = useRef<any>();
  const runDestroy = useRef<boolean>(false);
  const initialized = useRef<boolean>(false);

  const schemaFormOtp = getSchema(['otp']);

  const { control, handleSubmit, reset, formState } = useForm({
    defaultValues: { otp: '' },
    resolver: yupResolver(schemaFormOtp),
  });

  if (initialized.current) {
    runDestroy.current = true;
  }

  const requestTFACode = useCallback(async () => {
    api
      .post(`/users/${user.userId}/tfa`, { otpProcessCode: processCode ?? '' })
      .then((response) => {
        setOtpUuid(response.data.data.otpUuId);
      })
      .catch((e) => {
        setModalError({ error: e });
      });
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const timer = async () => {
    timerRef.current = setInterval(() => countdown(), 1000);
  }; //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!initialized.current) {
      if (!counting) {
        (async () => {
          await requestTFACode();
        })();
        setTime(60);
        timer();
        setCounting(true);
        initialized.current = true;
      } else {
        timer();
        initialized.current = true;
      }
    }
    return () => {
      if (!runDestroy.current) {
        return;
      }
      clearInterval(timerRef.current);
    };
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ otp: '' });
    }
  }, [formState, reset]);

  return (
    <ModalResponsive open={open} handleClose={handleClose}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Box mb={3}>
          <InputOTP
            name="otp"
            control={control}
            length={4}
            title={title ? title : '🎰 Verificación en dos pasos'}
            text={`Ingresa el código enviado a tu número celular +51 *** ***${getUserPhone().substring(
              getUserPhone().length - 4
            )}`}
            handleResendOTP={requestTFACode}
          />
        </Box>
        <Button variant="contained" type="submit" sx={{ width: '100%', mx: 'auto' }}>
          {textButton ? textButton : 'Verificar'}
        </Button>
        {closeApp && (
          <Button variant="outlined" sx={{ width: '100%', mx: 'auto', mt: 2 }} onClick={handleClose}>
            Conservar cuenta Yiro
          </Button>
        )}
      </Box>
    </ModalResponsive>
  );
}
