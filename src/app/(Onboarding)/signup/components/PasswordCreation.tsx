'use client';

import { Box, Button, Typography } from '@mui/material';
//Internal app
import { FormPass } from '@/components';
import { useSignupStore } from '@/store/signupStore';
import { useEffect } from 'react';

export default function PasswordCreation() {
  const { updateStep, inc, setShowHeader } = useSignupStore();

  const onSubmit = async (data: any) => {
    console.log(data);
    inc();
  };

  useEffect(() => {
    setShowHeader(true);
  }, []);

  return (
    <FormPass
      register
      onSubmit={onSubmit}
      description={
        <>
          <Typography variant="subtitle1" sx={{ mb: 3, mx: 'auto' }}>
            Ahora es momento de activar tu cuenta
          </Typography>
          <Typography variant="body2" mb="12px">
            Para finalizar crea una contraseña segura
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2">Elige 6 números que recuerdes.</Typography>
            <Typography variant="body2">Evita fechas de cumpleaños, números consecutivos ó iguales.</Typography>
          </Box>
        </>
      }
      buttons={
        <>
          <Button
            variant="outlined"
            onClick={() => {
              updateStep(8);
            }}
          >
            Anterior
          </Button>
          <Button variant="contained" type="submit">
            Siguiente
          </Button>
        </>
      }
    />
  );
}
