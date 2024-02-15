'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography } from '@mui/material';
//Internal app
import { getSchema } from '@/config';
import { useNavTitleStore } from '@/store';
import { ContainerLayout, InputTextPay } from '@/components';

export default function Recharge() {
  const schema = getSchema(['password']);

  const { updateTitle }: any = useNavTitleStore();

  useEffect(() => {
    updateTitle('Generar recarga');
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    console.log('🚀 ~ onSubmit ~ data:', data);
  };

  return (
    <ContainerLayout>
      <Typography
        variant="h6"
        color="primary"
        sx={{ color: 'primary.main', mb: 6, display: { xs: 'none ', md: 'block' } }}
      >
        Generar recarga
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <InputTextPay name="amount" control={control} label="¿Cuánto deseas recargar?" />
        <Button variant="contained" type="submit" fullWidth>
          Generar recarga
        </Button>
      </Box>
    </ContainerLayout>
  );
}
