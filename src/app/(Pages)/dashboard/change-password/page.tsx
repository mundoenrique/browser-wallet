'use client';

import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography } from '@mui/material';
//Internal app
import { getSchema } from '@/config';
import ModalOtp from '@/components/modal/ModalOtp';
import { useNavTitleStore, useMenuStore, useUserStore, useUiStore } from '@/store';
import { ContainerLayout, InputPass, ModalResponsive } from '@/components';
import { api } from '@/utils/api';
import { useRouter } from 'next/navigation';

export default function ChangePassword() {
  const router = useRouter();

  const { setCurrentItem } = useMenuStore();

  const { updateTitle } = useNavTitleStore();

  const [openRc, setOpenRc] = useState<boolean>(false);

  const [openOtp, setOpenOtp] = useState<boolean>(false);

  const schemaFormPassword = getSchema(['newPassword', 'newPasswordConfirmation', 'currentPassword']);

  const userId = useUserStore((state) => state.user.userId);

  const { setModalError, setLoadingScreen } = useUiStore();

  const { control, handleSubmit, reset, getValues } = useForm({
    defaultValues: { newPassword: '', newPasswordConfirmation: '', currentPassword: '' },
    resolver: yupResolver(schemaFormPassword),
  });

  const onSubmit = async () => {
    setOpenOtp(true);
  };

  const onSubmitOtp = async () => {
    setLoadingScreen(true);
    const requestData = {
      currentPassword: getValues('currentPassword'),
      newPassword: getValues('newPassword'),
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
  };

  const redirect = () => {
    setOpenRc(false);
    router.push('/dashboard');
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
          <Button variant="contained" type="submit" fullWidth>
            Guardar
          </Button>
        </Box>
      </ContainerLayout>

      <ModalOtp
        open={openOtp}
        handleClose={() => setOpenOtp(false)}
        onSubmit={onSubmitOtp}
        processCode="CHANGE_PASSWORD_OTP"
      />

      <ModalResponsive open={openRc} handleClose={() => redirect} data-testid="modal-succes">
        <Typography variant="subtitle2">🥳 Actualización exitosa</Typography>
      </ModalResponsive>
    </>
  );
}
