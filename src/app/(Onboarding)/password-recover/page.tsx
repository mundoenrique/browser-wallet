'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography } from '@mui/material';
//Internal app
import { getSchema } from '@/config';
import { InputPass, ModalResponsive } from '@/components';

export default function Recover() {
  const [open, setOpen] = useState(false);
  const schema = getSchema(['newPassword', 'newPasswordConfirmation']);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      newPassword: '',
      newPasswordConfirmation: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    console.log(data);
    setOpen(true);
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          height: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
        }}
      >
        <Box>
          <Typography fontWeight={700} textAlign="center" mb={3}>
            Crea una contraseña
          </Typography>
          <Typography mb={3}>
            Para poder continuar con tu proceso de activación, es necesario que crees una contraseña.
          </Typography>
          <InputPass name="newPassword" control={control} label="Ingresa tu contraseña" />
          <InputPass name="newPasswordConfirmation" control={control} label="Confirma tu contraseña" />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="primary" type="submit" sx={{ maxWidth: 284, width: '100%' }}>
            Continuar
          </Button>
        </Box>
      </Box>

      <ModalResponsive open={open} handleClose={() => setOpen(false)}>
        <>
          <Typography py={2} fontWeight={700}>
            📟 !Nueva contraseña!
          </Typography>
          <Typography textAlign="center">Tu contraseña ha sido actualizada exitosamente.</Typography>
        </>
      </ModalResponsive>
    </>
  );
}
