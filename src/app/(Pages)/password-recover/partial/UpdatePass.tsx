'use client';

import { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';
//Internal app
import { api } from '@/utils/api';
import { useRouter } from 'next/navigation';
import { encryptForge } from '@/utils/toolHelper';
import { FormPass, ModalResponsive } from '@/components';
import { sendGTMEvent } from '@next/third-parties/google';
import { useHeadersStore, useUiStore, useUserStore } from '@/store';

export default function UpdatePass() {
  const host = useHeadersStore((state) => state.host);

  const {
    user: { userId },
  } = useUserStore();
  const { setLoadingScreen, setModalError } = useUiStore();

  const [open, setOpen] = useState<boolean>(false);

  const { push } = useRouter();

  useEffect(() => {
    sendGTMEvent({
      event: 'ga4.trackEvent',
      eventName: 'page_view_ga4',
      eventParams: {
        page_location: `${host}/password-recover/codigo`,
        page_title: 'Yiro :: recuperarContraseña :: crearContraseña',
        page_referrer: `${host}/signin/interno`,
        section: 'Yiro :: recuperarContraseña :: crearContraseña',
        previous_section: 'Yiro :: recuperarContraseña :: código',
      },
    });
  }, [host]);

  const onSubmit = async (data: any) => {
    const { newPasswordConfirmation } = data;
    setLoadingScreen(true);

    api
      .put(`/users/${userId}/credentials`, { password: encryptForge(newPasswordConfirmation) })
      .then((response) => {
        const { status } = response;
        if (status === 200) {
          setOpen(true);
        }
      })
      .catch((e) => {
        setModalError({ error: e });
      })
      .finally(() => {
        setLoadingScreen(false);
      });
  };

  const closeModal = () => {
    setOpen(false);
    setLoadingScreen(false);
    push('/signin');
    sendGTMEvent({
      event: 'ga4.trackEvent',
      eventName: 'select_content',
      eventParams: {
        content_type: 'message',
        section: 'Yiro :: recuperarContraseña :: codigo',
        previous_section: 'Yiro :: login :: interno',
        selected_content: '!Nueva contraseña!',
        destination_page: `${host}/password-recover/crearContraseña`,
      },
    });
  };

  return (
    <>
      <FormPass
        onSubmit={onSubmit}
        description={
          <>
            <Typography sx={{ mb: 3, fontWeight: 700, textAlign: { md: 'center' } }}>
              Recuperar tu contraseña
            </Typography>

            <Typography variant="body2" fontWeight={700}>
              Elige 6 números que recuerdes.
            </Typography>
            <Typography mb={3} variant="body2">
              Evita fechas de cumpleaños, números consecutivos ó iguales.
            </Typography>
          </>
        }
        buttons={
          <Button
            variant="primary"
            type="submit"
            sx={{ maxWidth: 284, width: '100%' }}
            onClick={() => {
              sendGTMEvent({
                event: 'ga4.trackEvent',
                eventName: 'select_content',
                eventParams: {
                  content_type: 'boton',
                  section: 'Yiro :: recuperarContraseña :: crearContraseña',
                  previous_section: 'Yiro :: recuperarContraseña :: codigo',
                  selected_content: 'Guardar',
                  destination_page: `${host}/password-recover/crearContraseña`,
                },
              });
            }}
          >
            Guardar
          </Button>
        }
      />

      <ModalResponsive open={open} handleClose={closeModal}>
        <Typography py={2} fontWeight={700}>
          📟 !Nueva contraseña!
        </Typography>
        <Typography textAlign="center">Tu contraseña ha sido actualizada exitosamente.</Typography>
      </ModalResponsive>
    </>
  );
}
