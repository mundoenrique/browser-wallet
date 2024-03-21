'use client';

import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography } from '@mui/material';
//Internal app
import { getSchema } from '@/config';
import ModalOtp from '@/components/modal/ModalOtp';
import { useNavTitleStore, useMenuStore } from '@/store';
import { ContainerLayout, InputPass, ModalResponsive } from '@/components';

export default function ChangePassword() {
  const { updateTitle } = useNavTitleStore();
  const { setCurrentItem } = useMenuStore();
  const [openOtp, setOpenOtp] = useState<boolean>(false);
  const [openRc, setOpenRc] = useState<boolean>(false);
  const schemaFormPassword = getSchema(['newPassword', 'newPasswordConfirmation', 'currentPassword']);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: { newPassword: '', newPasswordConfirmation: '', currentPassword: '' },
    resolver: yupResolver(schemaFormPassword),
  });

  const onSubmit = async (data: any) => {
    console.log(data);
    setOpenOtp(true);
  };

  const onSubmitOtp = async (data: any) => {
    console.log(data);
    setOpenOtp(false);
    setOpenRc(true);
    reset();
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

        <Typography variant="body2">Elige 6 números que recuerdes.</Typography>

        <Typography variant="body2" mb={3}>
          Evita utilizar tu fecha de cumpleaños para que sea más segura
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

      <ModalOtp open={openOtp} handleClose={() => setOpenOtp(false)} onSubmit={onSubmitOtp} />

      <ModalResponsive open={openRc} handleClose={() => setOpenRc(false)}>
        <Typography variant="subtitle2">🥳 Actualización exitosa</Typography>
      </ModalResponsive>
    </>
  );
}
