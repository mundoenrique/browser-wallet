'use client';

import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography } from '@mui/material';
//Internal app
import { getSchema } from '@/config';
import { useNavTitleStore } from '@/store';
import InputOTP from '@/components/form/InputOTP';
import { InputPass, ModalResponsive } from '@/components';

export default function ChangePassword() {
  const { updateTitle }: any = useNavTitleStore();
  const [openOtp, setOpenOtp] = useState(false);
  const [openRc, setOpenRc] = useState(false);
  const schemaFormPassword = getSchema(['newPassword', 'newPasswordConfirmation', 'currentPassword']);
  const schemaFormOtp = getSchema(['otp']);

  const {
    control: controlFormPassword,
    handleSubmit: handleFormPassword,
    reset: resetFormPassword,
  } = useForm({
    defaultValues: { newPassword: '', newPasswordConfirmation: '', currentPassword: '' },
    resolver: yupResolver(schemaFormPassword),
  });

  const {
    control: controlFormOtp,
    handleSubmit: handleFormOtp,
    reset: resetFormOtp,
  } = useForm({
    defaultValues: { otp: '' },
    resolver: yupResolver(schemaFormOtp),
  });

  const onSubmit = async (data: any) => {
    console.log(data);
    setOpenOtp(true);
  };

  const onSubmitOtp = async (data: any) => {
    console.log(data);
    setOpenOtp(false);
    setOpenRc(true);
    resetFormOtp();
  };

  useEffect(() => {
    updateTitle('Cambiar contraseña');
  }, []);

  return (
    <>
      <Box sx={{ width: 320, mx: { xs: 'auto', md: 3 }, mt: { md: 29 } }}>
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

        <Box component="form" onSubmit={handleFormPassword(onSubmit)}>
          <InputPass name="currentPassword" control={controlFormPassword} label="Ingresar tu contraseña actual" />
          <InputPass name="newPassword" control={controlFormPassword} label="Ingresa una nueva contraseña" />
          <InputPass
            name="newPasswordConfirmation"
            control={controlFormPassword}
            label="Confirma tu nueva contraseña"
          />
          <Button variant="contained" type="submit" fullWidth>
            Guardar
          </Button>
        </Box>
      </Box>

      <ModalResponsive open={openOtp} handleClose={() => setOpenOtp(false)}>
        <Box component="form" onSubmit={handleFormOtp(onSubmitOtp)}>
          <Box mb={3}>
            <InputOTP
              name="otp"
              control={controlFormOtp}
              length={4}
              title="🎰 Verificación en dos pasos"
              text="Ingresa el código enviado a tu número celular +51 *** *** 1214"
            />
          </Box>
          <Button variant="contained" type="submit" sx={{ maxWidth: 284, width: '100%', mx: 'auto' }}>
            Continuar
          </Button>
        </Box>
      </ModalResponsive>

      <ModalResponsive open={openRc} handleClose={() => setOpenRc(false)}>
        <Typography variant="subtitle2">🥳 Actualización exitosa</Typography>
      </ModalResponsive>
    </>
  );
}
