'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
//Internal app
import { api } from '@/utils/api';
import { getSchema } from '@/config';
import Success from './partial/Success';
import { ContainerLayout, InputTextPay } from '@/components';
import { useNavTitleStore, useMenuStore, useUserStore, useCollectStore, useUiStore } from '@/store';
import { formatAmount } from '@/utils/toolHelper';

export default function Recharge() {
  const schema = getSchema(['amount']);

  const { setCurrentItem } = useMenuStore();

  const { updateTitle } = useNavTitleStore();

  const userId = useUserStore((state) => state.user.userId);

  const firstName = useUserStore((state) => state.user.firstName);

  const setModalError = useUiStore((state) => state.setModalError);

  const getUserPhone = useUserStore((state) => state.getUserPhone);

  const setLinkData = useCollectStore((state) => state.setLinkData);

  const setLoadingScreen = useUiStore((state) => state.setLoadingScreen);

  const firstLastName = useUserStore((state) => state.user.firstLastName);

  const [openRc, setOpenRc] = useState<boolean>(false);

  useEffect(() => {
    updateTitle('Generar recarga');
    setCurrentItem('recharge');
  }, [updateTitle, setCurrentItem]);

  const { control, handleSubmit, getValues } = useForm({
    defaultValues: { amount: '' },
    resolver: yupResolver(schema),
  });

  const generateCharge = useCallback(async () => {
    setLoadingScreen(true);
    const payload = {
      fullName: `${firstName} ${firstLastName}`,
      phoneNumber: getUserPhone(),
      operationCode: 'DIRECT_CHARGE',
      providerCode: 'PAGO_EFECTIVO',
      currencyCode: 'PEN',
      amount: formatAmount(getValues('amount')),
    };
    await api
      .post(`/payments/${userId}/charge`, payload)
      .then((response) => {
        setLinkData(response.data.data);
        setOpenRc(true);
      })
      .catch((e) => {
        setModalError({ error: e });
        setLoadingScreen(false);
      })
      .finally(() => {
        setLoadingScreen(false);
      });
  }, [setLoadingScreen, firstName, firstLastName, getUserPhone, getValues, userId, setLinkData, setModalError]);

  const onSubmit = async () => {
    await generateCharge();
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
            Recargar
          </Button>
        </Box>
      </ContainerLayout>

      {openRc && <Success />}
    </>
  );
}
