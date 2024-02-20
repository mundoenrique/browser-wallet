'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
//internal app
import { getSchema } from '@/config';
import { useRegisterStore } from '@/store';
import { Box, Button } from '@mui/material';
import InputOTP from '@/components/form/InputOTP';

export default function CelularValidation() {
  const schema = getSchema(['otp']);
  const { inc, dec } = useRegisterStore();

  const { handleSubmit, control } = useForm({
    defaultValues: {
      otp: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = () => {
    inc();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}
    >
      <Box sx={{ textAlign: 'center', mb: 5 }}>
        <InputOTP
          name="otp"
          title="Por tu seguridad validaremos tu celular"
          text="Ingresa el código de 4 dígitos que te enviamos por SMS al *** *** 1214"
          length={4}
          control={control}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 / 2, mb: { xs: 3, sm: 0 } }}>
        <Button
          variant="outlined"
          onClick={() => {
            dec();
          }}
        >
          Anterior
        </Button>
        <Button variant="primary" type="submit">
          Siguiente
        </Button>
      </Box>
    </Box>
  );
}
