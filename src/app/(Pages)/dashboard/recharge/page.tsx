'use client';

import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography } from '@mui/material';
//Internal app
import { getSchema } from '@/config';
import Success from './partial/Success';
import { useNavTitleStore, useMenuStore } from '@/store';
import { ContainerLayout, InputTextPay } from '@/components';

export default function Recharge() {
  const [openRc, setOpenRc] = useState<boolean>(false);
  const schema = getSchema(['amount']);
  const { updateTitle } = useNavTitleStore();
  const { setCurrentItem } = useMenuStore();

  useEffect(() => {
    updateTitle('Generar recarga');
    setCurrentItem('recharge');
  }, [updateTitle, setCurrentItem]);

  const { control, handleSubmit } = useForm({
    defaultValues: { amount: '' },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    setOpenRc(true);
    console.log('🚀 ~ onSubmit ~ data:', data);
  };

  return (
    <>
      <ContainerLayout>
        <Typography
          variant="h6"
          color="primary"
          sx={{ color: 'primary.main', mb: 6, display: { xs: 'none ', md: 'block' }, textAlign: 'center' }}
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

      {openRc && <Success />}
    </>
  );
}
