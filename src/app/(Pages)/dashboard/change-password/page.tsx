'use client';

import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography } from '@mui/material';
import { sendGTMEvent } from '@next/third-parties/google';
//Internal app
import { api } from '@/utils/api';
import { getSchema } from '@/config';
import { encryptForge } from '@/utils/toolHelper';
import ModalOtp from '@/components/modal/ModalOtp';
import { ContainerLayout, InputPass, ModalResponsive } from '@/components';
import { useNavTitleStore, useMenuStore, useUserStore, useUiStore, useHeadersStore } from '@/store';

export default function ChangePassword() {
  const router = useRouter();

  const schemaFormPassword = getSchema(['newPassword', 'newPasswordConfirmation', 'currentPassword']);

  const { setCurrentItem } = useMenuStore();

  const { updateTitle } = useNavTitleStore();

  const host = useHeadersStore((state) => state.host);

  const [openRc, setOpenRc] = useState<boolean>(false);

  const [openOtp, setOpenOtp] = useState<boolean>(false);

  const userId = useUserStore((state) => state.user.userId);

  const { setModalError, setLoadingScreen } = useUiStore();

  const { control, handleSubmit, reset, getValues } = useForm({
    defaultValues: { newPassword: '', newPasswordConfirmation: '', currentPassword: '' },
    resolver: yupResolver(schemaFormPassword),
  });

  useEffect(() => {
    sendGTMEvent({
      event: 'ga4.trackEvent',
      eventName: 'page_view_ga4',
      eventParams: {
        page_location: `${host}/dashboard/change-password`,
        page_title: 'Yiro :: cambiarContraseña',
        page_referrer: `${host}/dashboard`,
        section: 'Yiro :: cambiarContraseña',
        previous_section: 'dashboard',
      },
    });
  }, [host]);

  const onSubmit = async () => {
    setOpenOtp(true);
  };

  const onSubmitOtp = async () => {
    setLoadingScreen(true);
    const requestData = {
      currentPassword: encryptForge(getValues('currentPassword')),
      newPassword: encryptForge(getValues('newPassword')),
    };
    api
      .put(`/onboarding/users/${userId}/password`, requestData)
      .then(() => {
        setOpenOtp(false);
        setOpenRc(true);
      })
      .catch(() => {
        setModalError({ title: 'Algo salió mal', description: 'No pudimos cambiar la contraseña.' });
      })
      .finally(() => {
        setLoadingScreen(false);
        reset();
      });

    sendGTMEvent({
      event: 'ga4.trackEvent',
      eventName: 'select_content',
      eventParams: {
        content_type: 'boton_modal',
        section: 'Yiro :: cambiarContraseña',
        previous_section: 'dashboard',
        selected_content: 'Verificar',
        destination_page: `${host}/dashboard/change-password`,
        pop_up_type: 'Cambiar contraseña',
        pop_up_title: 'Verificación en dos pasos',
      },
    });
  };

  useEffect(() => {
    updateTitle('Cambiar contraseña');
    setCurrentItem('password-change');
  }, [updateTitle, setCurrentItem]);

  return (
    <>
      <ContainerLayout>
        <Typography
          variant="h6"
          color="primary"
          sx={{ color: 'primary.main', mb: 6, display: { xs: 'none ', md: 'block' }, textAlign: 'center' }}
        >
          Cambiar contraseña
        </Typography>

        <Typography variant="body2" fontWeight={700}>
          Elige 6 números que recuerdes.
        </Typography>

        <Typography variant="body2" mb={3}>
          Evita fechas de cumpleaños, números consecutivos ó iguales.
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <InputPass name="currentPassword" control={control} label="Ingresar tu contraseña actual" />
          <InputPass name="newPassword" control={control} label="Ingresa una nueva contraseña" />
          <InputPass name="newPasswordConfirmation" control={control} label="Confirma tu nueva contraseña" />
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
                  section: 'Yiro :: cambiarContraseña',
                  previous_section: 'dashboard',
                  selected_content: 'Guardar',
                  destination_page: `${host}/dashboard/change-password`,
                },
              });
            }}
          >
            Guardar
          </Button>
        </Box>
      </ContainerLayout>

      <ModalOtp
        open={openOtp}
        handleClose={() => {
          setOpenOtp(false);
          sendGTMEvent({
            event: 'ga4.trackEvent',
            eventName: 'select_content',
            eventParams: {
              content_type: 'boton_modal',
              section: 'Yiro :: cambiarContraseña',
              previous_section: 'dashboard',
              selected_content: 'Cerrar',
              destination_page: `${host}/dashboard/change-password`,
              pop_up_type: 'Cambiar contraseña',
              pop_up_title: 'Verificación en dos pasos',
            },
          });
        }}
        onSubmit={onSubmitOtp}
        processCode="CHANGE_PASSWORD_OTP"
      />

      <ModalResponsive
        open={openRc}
        handleClose={() => {
          setOpenRc(false);
          router.push('/dashboard');
        }}
        data-testid="modal-succes"
      >
        <Typography variant="subtitle2">🥳 Actualización exitosa</Typography>
      </ModalResponsive>
    </>
  );
}
