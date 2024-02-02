'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
//internal app
import { getSchema } from '@/config';
import { InputOTP } from '@/components';
import { Box, Button } from '@mui/material';
import { useSignupStore } from '@/store/volatileStore';

export default function CelularValidation() {
  const schema = getSchema(['otp']);
  const { inc, dec }: any = useSignupStore();

  const { handleSubmit, control } = useForm({
    defaultValues: {
      otp: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
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

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '12px', mb: { xs: 3, sm: 0 } }}>
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
