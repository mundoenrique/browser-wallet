'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { sendGTMEvent } from '@next/third-parties/google';
//Internal app
import { api } from '@/utils/api';
import { getSchema } from '@/config';
import { encryptForge } from '@/utils/toolHelper';
import ModalOtp from '@/components/modal/ModalOtp';
import { ContainerLayout, InputRadio, Linking, ModalResponsive } from '@/components';
import {
  useNavTitleStore,
  useConfigCardStore,
  useHeadersStore,
  useUserStore,
  useUiStore,
  useAccessSessionStore,
  useOtpStore,
} from '@/store';

export default function Survey() {
  const schema = getSchema(['blockType']);

  const { backLink } = useHeadersStore();

  const { updateTitle } = useNavTitleStore();

  const { updatePage } = useConfigCardStore();

  const user = useUserStore((state) => state.user);

  const host = useHeadersStore((state) => state.host);

  const otpUuid = useOtpStore((state) => state.otpUuid);

  const { setModalError, setLoadingScreen } = useUiStore();

  const setAccessSession = useAccessSessionStore((state) => state.setAccessSession);

  const [openRc, setOpenRc] = useState<boolean>(false);

  const [openOtp, setOpenOtp] = useState<boolean>(false);

  useEffect(() => {
    updateTitle('Ayúdanos con esta encuesta');
  }, [updateTitle]);

  const { control, handleSubmit, getValues } = useForm({
    defaultValues: { blockType: '' },
    resolver: yupResolver(schema),
  });

  const deleteAccount = async () => {
    const reasonCode = getValues('blockType');
    api
      .delete(`/users/${user.userId}`, { params: { reasonCode } })
      .then(() => {
        setOpenRc(true);
      })
      .catch(() => {
        setModalError({
          title: 'Algo salió mal',
          description: 'No pudimos eliminar tu cuenta en este momento. Intentalo nuevamente.',
        });
      })
      .finally(() => {
        setLoadingScreen(false);
      });
  };

  const onSubmit = async (data: any) => {
    setOpenOtp(true);
    sendGTMEvent({
      event: 'ga4.trackEvent',
      eventName: 'select_content',
      eventParams: {
        content_type: 'boton',
        section: 'Yiro :: configuracionTarjeta :: eliminarCuenta',
        previous_section: 'Yiro :: configuracionTarjeta :: menu',
        selected_content: `${data}`,
        destination_page: `${host}/dashboard/card-configuration/menu`,
      },
    });
  };

  const onSubmitOtp = useCallback(
    async (data: any) => {
      setLoadingScreen(true);
      const { otp } = data;
      const payload = {
        otpProcessCode: 'CARD_CANCELLATION_OTP',
        otpUuId: otpUuid,
        otpCode: encryptForge(otp),
      };

      api
        .post(`/users/${user.userId}/validate/tfa`, payload)
        .then((response) => {
          if (response.data.code === '200.00.000') {
            setOpenOtp(false);
            deleteAccount();
          }
        })
        .catch((e) => {
          setModalError({ error: e });
          setLoadingScreen(false);
        });
    },
    [otpUuid] //eslint-disable-line
  );

  const blockCardType = [
    {
      text: 'No la uso con frecuencia',
      value: '001',
    },
    {
      text: 'No me sirve para mi negocio',
      value: '002',
    },
    {
      text: 'Es complicada para usar',
      value: '003',
    },
    {
      text: 'Ya tengo otros medios pago',
      value: '004',
    },
    {
      text: 'No hay motivo solo quiero eliminar',
      value: '005',
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
          Ayúdanos con esta encuesta
        </Typography>

        <Linking
          onClick={() => {
            updatePage('main');
          }}
          href="#"
          label="Volver"
          adormentStart
        />

        <Typography variant="body2" mb={3}>
          Pensando siempre en darte la mejor propuesta de valor, quisiéramos saber el motivo por el que estás eliminando
          tu cuenta Yiro
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <InputRadio options={blockCardType} name="blockType" control={control} />
          <Button variant="contained" type="submit" fullWidth>
            Continuar
          </Button>
        </Box>
      </ContainerLayout>

      {openOtp && (
        <ModalOtp
          open={openOtp}
          handleClose={() => setOpenOtp(false)}
          onSubmit={onSubmitOtp}
          title="🎰 Verifica tu identidad para eliminar cuenta"
          textButton="Eliminar cuenta Yiro"
          processCode="CARD_CANCELLATION_OTP"
        />
      )}
      <ModalResponsive
        open={openRc}
        handleClose={() => {
          setAccessSession(false);
          window.open(backLink != '' ? backLink : (process.env.NEXT_PUBLIC_ALLOW_ORIGIN as string), '_self');
        }}
      >
        <Typography variant="subtitle1" mb={3}>
          🚫 Tu cuenta ha sido eliminada
        </Typography>
      </ModalResponsive>
    </>
  );
}
