'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState, useCallback } from 'react';
import { sendGTMEvent } from '@next/third-parties/google';
//Internal app
import { api } from '@/utils/api';
import { getSchema } from '@/config';
import { encryptForge } from '@/utils/toolHelper';
import ModalOtp from '@/components/modal/ModalOtp';
import { ContainerLayout, InputPass, Linking, ModalResponsive } from '@/components';
import { useNavTitleStore, useConfigCardStore, useUiStore, useOtpStore, useUserStore, useHeadersStore } from '@/store';

export default function ChangePin() {
  const host = useHeadersStore((state) => state.host);

  const otpUuid = useOtpStore((state) => state.otpUuid);

  const { userId } = useUserStore((state) => state.user);

  const cardId = useUserStore((state) => state.getUserCardId);

  const setModalError = useUiStore((state) => state.setModalError);

  const updatePage = useConfigCardStore((state) => state.updatePage);

  const updateTitle = useNavTitleStore((state) => state.updateTitle);

  const setLoadingScreen = useUiStore((state) => state.setLoadingScreen);

  const [openRc, setOpenRc] = useState<boolean>(false);

  const [openOtp, setOpenOtp] = useState<boolean>(false);

  const schemaFormPassword = getSchema(['newPin', 'confirmPin']);

  const { control, handleSubmit, reset, getValues } = useForm({
    defaultValues: { newPin: '', confirmPin: '' },
    resolver: yupResolver(schemaFormPassword),
  });

  const onSubmit = async () => {
    setOpenOtp(true);
  };

  const changePin = () => {
    setLoadingScreen(true);
    const payload = {
      pin: encryptForge(getValues('confirmPin')),
    };

    api
      .put(`/cards/${cardId()}/pin`, payload)
      .then(() => {
        setOpenRc(true);
      })
      .catch((e) => {
        setModalError({ error: e });
      })
      .finally(() => {
        setLoadingScreen(false);
        reset();
      });
  };

  const onSubmitOtp = useCallback(
    async (data: any) => {
      setLoadingScreen(true);
      const { otp } = data;
      const payload = {
        otpProcessCode: 'CHANGE_PIN_CARD_OTP',
        otpUuId: otpUuid,
        otpCode: encryptForge(otp),
      };

      api
        .post(`/users/${userId}/validate/tfa`, payload)
        .then((response) => {
          if (response.data.code === '200.00.000') {
            setOpenOtp(false);
            changePin();
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

  useEffect(() => {
    sendGTMEvent({
      event: 'ga4.trackEvent',
      eventName: 'page_view_ga4',
      eventParams: {
        page_location: `${host}/dashboard/card-configuration/cambiarPin`,
        page_title: 'Yiro :: configuracionTarjeta :: cambiarPin',
        page_referrer: `${host}/dashboard/card-configuration/menu`,
        section: 'Yiro :: configuracionTarjeta :: cambiarPin',
        previous_section: 'Yiro :: configuracionTarjeta :: menu',
      },
    });
  }, [host]);

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
          <Button
            variant="contained"
            type="submit"
            fullWidth
            onClick={() => {
              sendGTMEvent({
                event: 'ga4.trackEvent',
                eventName: 'select_content',
                eventParams: {
                  content_type: 'boton',
                  section: 'Yiro :: configuracionTarjeta :: cambiarPin',
                  previous_section: 'Yiro :: configuracionTarjeta :: menu',
                  selected_content: 'Cambiar PIN',
                  destination_page: `${host}/dashboard/card-configuration/menu`,
                },
              });
            }}
          >
            Cambiar PIN
          </Button>
        </Box>
      </ContainerLayout>

      {openOtp && (
        <ModalOtp
          open={openOtp}
          handleClose={() => setOpenOtp(false)}
          onSubmit={onSubmitOtp}
          processCode="CHANGE_PIN_CARD_OTP"
        />
      )}

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
