'use client';

import { useForm } from 'react-hook-form';
import { useEffect, useState, useCallback } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography } from '@mui/material';
//Internal app
import { getSchema } from '@/config';
import ModalOtp from '@/components/modal/ModalOtp';
import { api } from '@/utils/api';
import { useNavTitleStore, useConfigCardStore, useUiStore, useOtpStore, useUserStore } from '@/store';
import { ContainerLayout, InputPass, Linking, ModalResponsive } from '@/components';
import { encryptForge } from '@/utils/toolHelper';

export default function ChangePin() {
  const updateTitle = useNavTitleStore((state) => state.updateTitle);

  const updatePage = useConfigCardStore((state) => state.updatePage);

  const setLoadingScreen = useUiStore((state) => state.setLoadingScreen);

  const setModalError = useUiStore((state) => state.setModalError);

  const otpUuid = useOtpStore((state) => state.otpUuid);

  const resetOtp = useOtpStore((state) => state.reset);

  const userId = useUserStore((state) => state.userId);

  const cardId = useUserStore((state) => state.getUserCardId);

  const [openRc, setOpenRc] = useState<boolean>(false);

  const [openOtp, setOpenOtp] = useState<boolean>(false);

  const schemaFormPassword = getSchema(['newPin', 'confirmPin']);

  const { control, handleSubmit, reset, getValues } = useForm({
    defaultValues: { newPin: '', confirmPin: '' },
    resolver: yupResolver(schemaFormPassword),
  });

  const onSubmit = async (data: any) => {
    setOpenOtp(true);
  };

  const changePin = () => {
    const payload = {
      pin: encryptForge(getValues('confirmPin')),
    };
    api
      .put(`/cards/${cardId}/pin`, payload)
      .then(() => {
        setOpenRc(true);
        reset();
      })
      .catch((e) => {
        setModalError({ error: e });
      })
      .finally(() => {
        setLoadingScreen(true);
      });
  };

  const onSubmitOtp = useCallback(
    async (data: any) => {
      setLoadingScreen(true);
      const { otp } = data;

      const payload = {
        otpProcessCode: 'LOCK_AND_UNLOCK_CARD_OTP',
        otpUuId: otpUuid,
        otpCode: encryptForge(otp),
      };

      api
        .post(`/users/${userId}/validate/tfa`, payload)
        .then((response) => {
          if (response.data.code === '200.00.000') {
            setOpenOtp(false);
            changePin();
            resetOtp();
          }
        })
        .catch((e) => {
          setModalError({ error: e });
          setLoadingScreen(false);
        });
    },
    [otpUuid] //eslint-disable-line
  );

  useEffect(() => {
    updateTitle('Cambiar PIN');
  }, [updateTitle]);

  return (
    <>
      <ContainerLayout>
        <Typography
          variant="h6"
          color="primary"
          sx={{ color: 'primary.main', mb: 6, display: { xs: 'none ', md: 'block' }, textAlign: 'center' }}
        >
          Cambiar PIN
        </Typography>

        <Linking
          href="#"
          label="Volver"
          onClick={() => {
            updatePage('main');
          }}
          adormentStart
        />

        <Typography variant="body2" mb={3}>
          A continuación puedes cambiar tu PIN, recuérdalo al momento de usar tu tarjeta
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <InputPass
            name="newPin"
            control={control}
            label="Nuevo Pin"
            inputProperties={{ inputProps: { maxLength: 4 } }}
          />
          <InputPass
            name="confirmPin"
            control={control}
            label="Confirmar tu nuevo Pin"
            inputProperties={{ inputProps: { maxLength: 4 } }}
          />
          <Button variant="contained" type="submit" fullWidth>
            Cambiar PIN
          </Button>
        </Box>
      </ContainerLayout>

      <ModalOtp
        open={openOtp}
        handleClose={() => setOpenOtp(false)}
        onSubmit={onSubmitOtp}
        processCode="LOCK_AND_UNLOCK_CARD_OTP"
      />

      <ModalResponsive open={openRc} handleClose={() => setOpenRc(false)}>
        <Typography variant="h6" mb={3}>
          🥳 Actualización exitosa
        </Typography>
        <Typography variant="body1" textAlign="center" mb={3}>
          El PIN de tu tarjeta ha sido actualizado con éxito.
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            setOpenRc(false);
            updatePage('main');
          }}
          fullWidth
        >
          Ir al Inicio
        </Button>
      </ModalResponsive>
    </>
  );
}
