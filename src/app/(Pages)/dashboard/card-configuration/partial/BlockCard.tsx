'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState, useCallback } from 'react';
import { Box, Button, Typography, Stack } from '@mui/material';
//Internal app
import { api } from '@/utils/api';
import { getSchema } from '@/config';
import { encryptForge } from '@/utils/toolHelper';
import ModalOtp from '@/components/modal/ModalOtp';
import { ContainerLayout, InputRadio, Linking, ModalResponsive } from '@/components';
import { useUserStore, useUiStore, useOtpStore, useNavTitleStore, useConfigCardStore } from '@/store';

export default function BlockCard() {
  const { updateTitle } = useNavTitleStore();
  const { updatePage } = useConfigCardStore();
  const [open, setOpen] = useState<boolean>(false);
  const schema = getSchema(['blockType']);

  const router = useRouter();

  const getUserCardId = useUserStore((state) => state.getUserCardId);

  const setModalError = useUiStore((state) => state.setModalError);

  const setLoadingScreen = useUiStore((state) => state.setLoadingScreen);

  const { userId } = useUserStore((state) => state.user);

  const otpUuid = useOtpStore((state) => state.otpUuid);

  const [openOtp, setOpenOtp] = useState<boolean>(false);

  useEffect(() => {
    updateTitle('Bloquear tarjeta');
  }, [updateTitle]);

  const { control, handleSubmit, getValues } = useForm({
    defaultValues: { blockType: '' },
    resolver: yupResolver(schema),
  });

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
            onSubmit();
          }
        })
        .catch((e) => {
          setModalError({ error: e });
          setLoadingScreen(false);
        });
    },
    [otpUuid] //eslint-disable-line
  );

  const onSubmit = async () => {
    setLoadingScreen(true);
    api
      .post(`/cards/${getUserCardId()}/block`, { blockType: getValues('blockType') })
      .then(() => {
        setOpen(!open);
      })
      .catch((e: any) => {
        setModalError({ error: e });
      })
      .finally(() => {
        setLoadingScreen(false);
      });
  };

  const blockCardType = [
    {
      text: 'Por perdida(definitivo)',
      value: '41',
    },
    {
      text: 'Por robo (definitivo)',
      value: '43',
    },
    {
      text: 'Deterioro (definitivo)',
      value: '17',
    },
  ];

  return (
    <>
      <ContainerLayout>
        <Typography
          variant="h6"
          color="primary"
          sx={{ color: 'primary.main', mb: 6, display: { xs: 'none ', md: 'block' }, textAlign: 'center' }}
        >
          Bloquear tarjeta
        </Typography>

        <Linking
          href="#"
          onClick={() => {
            updatePage('main');
          }}
          label="Volver"
          adormentStart
        />

        <Typography variant="body2" mb={3}>
          Selecciona una de las siguientes opciones para bloquear la tarjeta, dependiendo tu preferencia.
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <InputRadio options={blockCardType} name="blockType" control={control} />
          <Button variant="contained" type="submit" fullWidth>
            Bloquear
          </Button>
        </Box>
      </ContainerLayout>

      <ModalResponsive open={open} handleClose={() => setOpen(false)}>
        <Typography variant="subtitle1" mb={3}>
          🚫 Tarjeta Bloqueada
        </Typography>
        <Stack spacing={2} sx={{ textAlign: 'left' }} mb={3}>
          <Typography variant="body2">Tu tarjeta esta bloqueada.</Typography>
          <Typography variant="body2">Además estamos creándote una nueva cuenta Yiro Virtual</Typography>
          <Typography variant="body2">
            No te preocupes conservaras todos los datos de tu cuenta anterior y puedes seguir usando nuestros servicios.
          </Typography>
          <Typography variant="body2">Si quieres una nueva tarjeta física tienes que volver a solicitarla.</Typography>
          <Typography variant="body2">Si tienes afiliado un pago recurrente tienes que volver a generarlo.</Typography>
        </Stack>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(false);
            router.push('/dashboard');
          }}
          fullWidth
        >
          Crear nueva cuenta
        </Button>
      </ModalResponsive>
      {openOtp && (
        <ModalOtp
          open={openOtp}
          handleClose={() => setOpenOtp(false)}
          onSubmit={onSubmitOtp}
          processCode="SEE_CARD_NUMBER"
        />
      )}
    </>
  );
}
