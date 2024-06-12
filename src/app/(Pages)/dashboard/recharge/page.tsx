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
  const { setCurrentItem } = useMenuStore();
  const { updateTitle } = useNavTitleStore();

  const [openRc, setOpenRc] = useState<boolean>(false);

  const schema = getSchema(['amount']);

  useEffect(() => {
    updateTitle('Generar recarga');
    setCurrentItem('recharge');
  }, [updateTitle, setCurrentItem]);

  const { control, handleSubmit } = useForm({
    defaultValues: { amount: '' },
    resolver: yupResolver(schema),
  });

  const onSubmit = async () => {
    setOpenRc(true);
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
          <InputTextPay
            name="amount"
            control={control}
            label="¿Cuánto deseas recargar?"
            onChange={(e) => console.log('onChange', e)}
          />
          <Button variant="contained" type="submit" fullWidth>
            Recargar
          </Button>
        </Box>
      </ContainerLayout>

      {openRc && <Success />}
    </>
  );
}
