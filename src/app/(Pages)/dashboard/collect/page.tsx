'use client';

import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
//Internal app
import { api } from '@/utils/api';
import { GroupIcon } from '%/Icons';
import { getSchema } from '@/config';
import SuccessCards from './partial/SuccessCards';
import Wallets from '%/images/suppliers/wallets.png';
import SuccessWallets from './partial/SuccessWallets';
import Franchises from '%/images/suppliers/franchises.png';
import { ContainerLayout, InputText, InputTextPay } from '@/components';
import { useMenuStore, useNavTitleStore, useClientStore, useUserStore, useCollectStore, useUiStore } from '@/store';

export default function Collect() {
  const schema = getSchema(['nameClient', 'numberClient', 'amount']);

  const { client } = useClientStore();

  const { setCurrentItem } = useMenuStore();

  const { updateTitle } = useNavTitleStore();

  const userId = useUserStore((state) => state.user.userId);

  const setLoad = useCollectStore((state) => state.setLoad);

  const loadingScreen = useUiStore((state) => state.loadingScreen);

  const setModalError = useUiStore((state) => state.setModalError);

  const setLinkData = useCollectStore((state) => state.setLinkData);

  const setLoadingScreen = useUiStore((state) => state.setLoadingScreen);

  const [showActionBtn, setShowActionBtn] = useState<string>('');

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
    setLoadingScreen(true);
    const payload = {
      fullName: getValues('nameClient'),
      phoneNumber: getValues('numberClient'),
      operationCode: 'DESTINATION_CHARGE',
      providerCode: showActionBtn === 'wallets' ? 'PAGO_EFECTIVO' : 'CYBERSOURCE',
      currencyCode: 'PEN',
      amount: getValues('amount'),
    };
    await api
      .post(`/payments/${userId}/charge`, payload)
      .then((response) => {
        setLinkData(response.data.data);
      })
      .catch((e) => {
        setModalError({ error: e });
        setLoadingScreen(false);
      })
      .finally(() => {
        setLoadingScreen(false);
      });
  }, [setLoadingScreen, getValues, showActionBtn, userId, setLinkData, setModalError]);

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
              <Image src={Wallets} alt="Billetas y bancos" priority />
            </Button>
            <Button variant="payment" type="submit" sx={{ width: 144, p: 2 }} id="cards">
              Tarjeta de crédito o débito
              <Image src={Franchises} alt="Billetas y bancos" priority />
            </Button>
          </Box>
        </Box>
      </ContainerLayout>

      {!loadingScreen && rcViews[showActionBtn]}
    </>
  );
}
