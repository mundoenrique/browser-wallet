'use client';

import { useForm } from 'react-hook-form';
import { Box, Button } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useCallback, useRef, useState } from 'react';
//Internal app
import { api } from '@/utils/api';
import { getSchema } from '@/config';
import InputOTP from '../form/InputOTP';
import { ModalOtpProps } from '@/interfaces';
import ModalResponsive from './ModalResponsive';
import { handleMaskOtp } from '@/utils/toolHelper';
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
  const { handleClose, open, onSubmit, closeApp, title, textButton, processCode, disableSubmit } = props;

  const { setModalError } = useUiStore();

  const user = useUserStore((state) => state.user);

  const getUserPhone = useUserStore((state) => state.getUserPhone);

  const setOtpUuid = useOtpStore((state) => state.setOtpUuid);

  const [timeLeft, setTimeLeft] = useState<number>(60);

  const schemaFormOtp = getSchema(['otp']);

  const { control, handleSubmit, reset, formState } = useForm({
    defaultValues: { otp: '' },
    resolver: yupResolver(schemaFormOtp),
  });

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

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft]); //eslint-disable-line react-hooks/exhaustive-deps

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
            text={`Ingresa el código enviado a tu número celular +51 *** *** ${handleMaskOtp(getUserPhone())} `}
            handleResendOTP={requestTFACode}
            timeLeft={timeLeft}
            setTime={setTimeLeft}
          />
        </Box>
        <Button variant="contained" type="submit" sx={{ width: '100%', mx: 'auto' }} disabled={disableSubmit ?? false}>
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
