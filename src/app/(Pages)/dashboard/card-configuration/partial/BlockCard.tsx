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
import { ContainerLayout, InputRadio, Linking } from '@/components';
import { useUserStore, useUiStore, useOtpStore, useNavTitleStore, useConfigCardStore, useHeadersStore } from '@/store';

export default function BlockCard() {
  const updateTitle = useNavTitleStore((state) => state.updateTitle);

  const updatePage = useConfigCardStore((state) => state.updatePage);

  const host = useHeadersStore((state) => state.host);

  const otpUuid = useOtpStore((state) => state.otpUuid);

  const { userId } = useUserStore((state) => state.user);

  const setUser = useUserStore((state) => state.setUser);

  const setModalError = useUiStore((state) => state.setModalError);

  const getUserCardId = useUserStore((state) => state.getUserCardId);

  const setLoadingScreen = useUiStore((state) => state.setLoadingScreen);

  const [openOtp, setOpenOtp] = useState<boolean>(false);

  const schema = getSchema(['blockType']);

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

  const getUserDetails = async () => {
    await api.get(`/users/${userId}`).then((response) => {
      const userDetail = response.data.data;
      setUser(userDetail);
    });
  };

  const onSubmit = async () => {
    setLoadingScreen(true);
    const payload = {
      blockType: getValues('blockType'),
      observations: (() => {
        const observation: any = {
          '41': 'Perdida',
          '43': 'Robo',
          '17': 'Deterioro',
        };
        return observation[getValues('blockType')];
      })(),
    };

    api
      .post(`/cards/${getUserCardId()}/block`, payload)
      .then(async () => {
        await getUserDetails();
      })
      .catch((e: any) => {
        setModalError({ error: e });
      })
      .finally(() => {
        setLoadingScreen(false);
      });
  };

  useEffect(() => {
    sendGTMEvent({
      event: 'ga4.trackEvent',
      eventName: 'page_view_ga4',
      eventParams: {
        page_location: `${host}/dashboard/card-configuration/bloquearTarjeta`,
        page_title: 'Yiro :: Yiro :: configuracionTarjeta :: bloquearTarjeta',
        page_referrer: `${host}/dashboard/card-configuration/menu`,
        section: 'Yiro :: Yiro :: configuracionTarjeta :: bloquearTarjeta',
        previous_section: 'Yiro :: configuracionTarjeta :: menu',
      },
    });
  }, [host]);

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

        <Box
          component="form"
          onSubmit={handleSubmit(() => {
            // setOpenOtp(true);
            onSubmit();
            sendGTMEvent({
              event: 'ga4.trackEvent',
              eventName: 'select_content',
              eventParams: {
                content_type: 'boton',
                section: 'Yiro :: Yiro :: configuracionTarjeta :: bloquearTarjeta',
                previous_section: 'Yiro :: configuracionTarjeta :: menu',
                selected_content: 'Bloqueo definitivo',
                destination_page: `${host}/dashboard/card-configuration/menu`,
              },
            });
          })}
        >
          <InputRadio options={blockCardType} name="blockType" control={control} />
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
                  section: 'Yiro :: Yiro :: configuracionTarjeta :: bloquearTarjeta',
                  previous_section: 'Yiro :: configuracionTarjeta :: menu',
                  selected_content: 'Bloquear',
                  destination_page: `${host}/dashboard`,
                },
              });
            }}
          >
            Bloquear
          </Button>
        </Box>
      </ContainerLayout>

      {openOtp && (
        <ModalOtp
          open={openOtp}
          handleClose={() => setOpenOtp(false)}
          onSubmit={onSubmitOtp}
          processCode="LOCK_AND_UNLOCK_CARD_OTP"
        />
      )}
    </>
  );
}
