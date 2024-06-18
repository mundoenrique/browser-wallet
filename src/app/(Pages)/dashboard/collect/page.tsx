'use client';

import Image from 'next/image';
import { set, useForm } from 'react-hook-form';
import { useCallback, useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography } from '@mui/material';
//Internal app
import { GroupIcon } from '%/Icons';
import { getSchema } from '@/config';
import SuccessCards from './partial/SuccessCards';
import wallets from '%/images/suppliers/wallets.png';
import SuccessWallets from './partial/SuccessWallets';
import franchises from '%/images/suppliers/franchises.png';
import { ContainerLayout, InputText, InputTextPay } from '@/components';
import { useMenuStore, useNavTitleStore, useClientStore, useUserStore, useCollectStore } from '@/store';
import { api } from '@/utils/api';

export default function Collect() {
  const [showActionBtn, setShowActionBtn] = useState<string>('');
  const { updateTitle } = useNavTitleStore();
  const { setCurrentItem } = useMenuStore();
  const { client } = useClientStore();
  const schema = getSchema(['nameClient', 'numberClient', 'amount']);

  const userId = useUserStore((state) => state.user);
  const setLoad = useCollectStore((state) => state.setLoad);
  const setLinkData = useCollectStore((state) => state.setLinkData);

  const {
    control,
    getValues,
    handleSubmit,
    reset,
    setValue: setValueClient,
  } = useForm({
    defaultValues: { nameClient: '', numberClient: '', amount: '' },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    updateTitle('Crear solicitud de cobro');
    setCurrentItem('collect');
  }, [updateTitle, setCurrentItem]);

  useEffect(() => {
    setValueClient('nameClient', client?.name);
    setValueClient('numberClient', client?.number);
    setValueClient('amount', client?.amount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client]);

  const rcViews: any = {
    wallets: <SuccessWallets />,
    cards: <SuccessCards />,
  };

  const generateCharge = useCallback(async () => {
    const payload = {
      fullName: getValues('nameClient'),
      phoneNumber: getValues('numberClient'),
      operationCode: 'DESTINATION_CHARGE',
      providerCode: showActionBtn === 'wallets' ? 'PAGO_EFECTIVO' : 'CYBERSOURCE',
      currencyCode: 'PEN',
      amount: getValues('amount'),
    };
    console.log('🚀 ~ generateCharge ~ payload:', payload);
    await api
      .post(`/payments/${userId}/charge`, payload)
      .then((response) => {
        console.log('🚀 ~ generateCharge ~ response:', response);
        setLinkData(response.data.data);
      })
      .catch((error) => {
        console.log('🚀 ~ generateCharge ~ error:', error);
      });
  }, [getValues, showActionBtn, userId, setLinkData]);

  const onSubmit = async (data: any, e: any) => {
    e.preventDefault();

    setLoad({ name: data.nameClient, phoneNumber: data.numberClient });

    if (e.nativeEvent.submitter.id === 'wallets') {
      setShowActionBtn('wallets');
    }

    if (e.nativeEvent.submitter.id === 'cards') {
      setShowActionBtn('cards');
    }
  };

  useEffect(() => {
    if (showActionBtn) {
      generateCharge();
      reset();
    }
  }, [generateCharge, reset, showActionBtn]);

  return (
    <>
      <ContainerLayout>
        <Typography
          variant="h6"
          color="primary"
          sx={{ color: 'primary.main', mb: 6, display: { xs: 'none ', md: 'block' }, textAlign: 'center' }}
        >
          Crear solicitud de cobro
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <InputText
            name="numberClient"
            control={control}
            label="¿A quién le quieres cobrar?"
            endAdornment={<GroupIcon />}
          />
          <InputText name="nameClient" control={control} label="Nombre de la persona" endAdornment={<GroupIcon />} />
          <InputTextPay name="amount" control={control} label="¿Cuánto dinero quieres cobrar?" />
          <Typography variant="body1" mb={1}>
            ¿Cómo te va a pagar el cliente?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="payment" type="submit" sx={{ width: 144, p: 2 }} id="wallets">
              Billetera digital, Banco o agencia
              <Image src={wallets} alt="Billetas y bancos" priority />
            </Button>
            <Button variant="payment" type="submit" sx={{ width: 144, p: 2 }} id="cards">
              Tarjeta de crédito o débito
              <Image src={franchises} alt="Billetas y bancos" priority />
            </Button>
          </Box>
        </Box>
      </ContainerLayout>

      {rcViews[showActionBtn]}
    </>
  );
}
