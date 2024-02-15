'use client';

import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography } from '@mui/material';
//Internal app
import { getSchema } from '@/config';
import { useNavTitleStore } from '@/store';
import { InputPass, ModalOtp, ModalResponsive } from '@/components';

export default function ChangePassword() {
  const { updateTitle }: any = useNavTitleStore();
  const [openOtp, setOpenOtp] = useState(false);
  const [openRc, setOpenRc] = useState(false);
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
  }, []);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: { xs: 'flex-start', md: 'center' },
          width: 320,
          minHeight: '100vh',
          mx: { xs: 'auto', md: 3 },
        }}
      >
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
      </Box>

      <ModalOtp open={openOtp} handleClose={() => setOpenOtp(false)} onSubmit={onSubmitOtp} />

      <ModalResponsive open={openRc} handleClose={() => setOpenRc(false)}>
        <Typography variant="subtitle2">🥳 Actualización exitosa</Typography>
      </ModalResponsive>
    </>
  );
}
