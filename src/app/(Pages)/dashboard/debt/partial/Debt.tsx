'use client';

import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Card, Stack, Typography } from '@mui/material';
//Internal app
import { getSchema } from '@/config';
import { fuchsiaBlue } from '@/theme/theme-default';
import { useMenuStore, useNavTitleStore } from '@/store';
import { ContainerLayout, InputTextPay, Linking } from '@/components';

export default function Debt() {
  const [openRc, setOpenRc] = useState<boolean>(false);
  const { updateTitle } = useNavTitleStore();
  const { setCurrentItem } = useMenuStore();
  const schema = getSchema(['amount']);

  const { control, handleSubmit } = useForm({
    defaultValues: { amount: '' },
    resolver: yupResolver(schema),
  });

  const onSubmit = async () => {
    setOpenRc(true);
  };

  useEffect(() => {
    updateTitle('Pagar deuda con ésika');
    setCurrentItem('home');
  }, [updateTitle, setCurrentItem]);

  return (
    <>
      <ContainerLayout>
        <Typography
          variant="h6"
          color="primary"
          sx={{ color: 'primary.main', mb: 6, display: { xs: 'none ', md: 'block' }, textAlign: 'center' }}
        >
          Pagar deuda con ésika
        </Typography>

        <Linking href="/dashboard" label="Volver" adormentStart />

        <Card sx={{ boxShadow: 'none', bgcolor: fuchsiaBlue[300], px: 3, py: 1, mb: 4, borderRadius: '16px' }}>
          <Stack spacing={1} sx={{ display: 'grid', justifyContent: 'center', justifyItems: 'center' }}>
            <Typography variant="body1" color="primary.main">
              Deuda total
            </Typography>
            <Typography variant="h6">S/ 350.00</Typography>
            <Typography variant="body2" color="primary.main">
              Vence el 31 de Dic 2023
            </Typography>
          </Stack>
        </Card>

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <InputTextPay name="amount" control={control} label="¿Cuánto deseas pagar?" />
          <Button variant="contained" type="submit" fullWidth>
            Pagar
          </Button>
        </Box>
      </ContainerLayout>
    </>
  );
}
