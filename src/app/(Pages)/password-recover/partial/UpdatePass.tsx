'use client';

import { useState } from 'react';
import { Button, Typography } from '@mui/material';
//Internal app
import { FormPass, ModalResponsive } from '@/components';
import { useApi } from '@/hooks/useApi';
import { useOtpStore, useUiStore, useUserStore } from '@/store';
import { encryptForge } from '@/utils/toolHelper';
import { useRouter } from 'next/navigation';

export default function UpdatePass() {
  const customApi = useApi();
  const router = useRouter();

  const [open, setOpen] = useState<boolean>(false);

  const { setLoadingScreen, setModalError } = useUiStore();
  const { setOTPValid } = useOtpStore();
  const {
    user: { userId },
  } = useUserStore();

  const onSubmit = async (data: any) => {
    console.log(data);
    const { newPasswordConfirmation } = data;
    setLoadingScreen(true);
    customApi
      .put(`/users/${userId}/credentials`, { password: encryptForge(newPasswordConfirmation) })
      .then((response) => {
        const { status } = response;
        if (status === 200) {
          setOpen(true);
        }
      })
      .catch((error) => {
        setModalError({ title: 'Algo salió mal', description: 'Intentalo nuevamente' });
      })
      .finally(() => {
        setLoadingScreen(false);
      });
  };

  const closeModal = () => {
    setOpen(false);
    setOTPValid(false);
    router.push('/signin');
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
          <Button variant="primary" type="submit" sx={{ maxWidth: 284, width: '100%' }}>
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
