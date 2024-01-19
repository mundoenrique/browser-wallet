'use client';

import { useForm } from 'react-hook-form';
import { Box, Button, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
//Internal app
import { getSchema } from '@/config';
import { InputCheck, InputPass } from '@/components';

export default function Recover() {
  const schema = getSchema(['newPassword', 'newPasswordConfirm', 'legal']);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      newPassword: '',
      newPasswordConfirm: '',
      legal: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    console.log(data);
  };

  return (
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
        <InputPass name="newPassword" control={control} label="Ingresar tu contraseña" />
        <InputPass name="newPasswordConfirm" control={control} label="Confirma tu contraseña" />
        <InputCheck
          name="legal"
          control={control}
          label="He leído y acepto la política de privacidad y términos del servicio y autorización de LDPD."
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" type="submit" sx={{ maxWidth: 284, width: '100%' }}>
          Continuar
        </Button>
        <Button variant="text" sx={{ maxWidth: 284, width: '100%', color: 'red' }}>
          Capturar
        </Button>
      </Box>
    </Box>
  );
}
