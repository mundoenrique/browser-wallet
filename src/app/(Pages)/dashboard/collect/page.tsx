'use client';

import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { sendGTMEvent } from '@next/third-parties/google';
//Internal app
import { api } from '@/utils/api';
import { GroupIcon } from '%/Icons';
import { getSchema } from '@/config';
import { formatAmount } from '@/utils/toolHelper';
import SuccessCards from './partial/SuccessCards';
import Wallets from '%/images/suppliers/wallets.png';
import SuccessWallets from './partial/SuccessWallets';
import Franchises from '%/images/suppliers/franchises.png';
import { ContainerLayout, InputText, InputTextPay } from '@/components';
import {
  useMenuStore,
  useNavTitleStore,
  useClientStore,
  useUserStore,
  useCollectStore,
  useUiStore,
  useHeadersStore,
} from '@/store';

export default function Collect() {
  const schema = getSchema(['nameClient', 'numberClient', 'amount']);

  const client = useClientStore((state) => state.client);

  const setClient = useClientStore((state) => state.setClient);

  const { setCurrentItem } = useMenuStore();

  const { updateTitle } = useNavTitleStore();

  const host = useHeadersStore((state) => state.host);

  const userId = useUserStore((state) => state.user.userId);

  const setLoad = useCollectStore((state) => state.setLoad);

  const loadingScreen = useUiStore((state) => state.loadingScreen);

  const setModalError = useUiStore((state) => state.setModalError);

  const setLinkData = useCollectStore((state) => state.setLinkData);

  const setLoadingScreen = useUiStore((state) => state.setLoadingScreen);

  const [showActionBtn, setShowActionBtn] = useState<string>('');

  useEffect(() => {
    sendGTMEvent({
      event: 'ga4.trackEvent',
      eventName: 'page_view_ga4',
      eventParams: {
        page_location: `${host}/dashboard/collect`,
        page_title: 'cobrar :: monto',
        page_referrer: `${host}/dashboard`,
        section: 'cobrar :: monto',
        previous_section: 'dashboard',
      },
    });
  }, [host]);

  const {
    control,
    getValues,
    handleSubmit,
    reset,
    setValue: setValueClient,
    setError,
  } = useForm({
    defaultValues: { nameClient: '', numberClient: '', amount: '' },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    updateTitle('Crear solicitud de cobro');
    setCurrentItem('collect');
  }, [updateTitle, setCurrentItem]);

  useEffect(() => {
    setValueClient('nameClient', client?.fullname);
    setValueClient('numberClient', client?.number);
    return () => {
      setClient({ fullname: '', number: '' });
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
      amount: formatAmount(getValues('amount')),
    };
    await api
      .post(`/payments/${userId}/charge`, payload)
      .then((response) => {
        setLinkData(response.data.data);
      })
      .catch((e) => {
        setModalError({ error: e });
        setLoadingScreen(false);
        setShowActionBtn('');
      })
      .finally(() => {
        setLoadingScreen(false);
        reset();
      });
  }, [setLoadingScreen, getValues, showActionBtn, userId, setLinkData, setModalError, reset]);

  const onSubmit = async (data: any, e: any) => {
    e.preventDefault();

    const validate = {
      min: parseFloat(data.amount) < 1,
      max: parseFloat(data.amount) > 4950,
    };

    if (validate.min || validate.max) {
      validate.min && setError('amount', { type: 'customError', message: 'El monto debe ser mayor o igual a S/ 1.00' });

      validate.max &&
        setError('amount', { type: 'customError', message: 'El monto debe ser menor o igual a S/ 4950.00' });

      return;
    }

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

        <Box name="form" component="form" onSubmit={handleSubmit(onSubmit)}>
          <InputText
            name="numberClient"
            control={control}
            label="¿A quién le quieres cobrar?"
            inputProps={{ maxLength: 9 }}
            endAdornment={<GroupIcon />}
          />
          <InputText name="nameClient" control={control} label="Nombre de la persona" endAdornment={<GroupIcon />} />
          <InputTextPay name="amount" control={control} label="¿Cuánto dinero quieres cobrar?" />
          <Typography variant="body1" mb={1}>
            ¿Cómo te va a pagar el cliente?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="payment"
              type="submit"
              sx={{ width: 144, p: 2 }}
              id="wallets"
              onClick={() => {
                sendGTMEvent({
                  event: 'ga4.trackEvent',
                  eventName: 'select_content',
                  eventParams: {
                    content_type: 'boton',
                    section: 'cobrar :: monto',
                    previous_section: 'dashboard',
                    selected_content: 'Billetera digital, Banco o agencia',
                    destination_page: `${host}/dashboard/collect`,
                  },
                });
              }}
            >
              Billetera digital, Banco o agencia
              <Image src={Wallets} alt="Billetas y bancos" priority />
            </Button>
            <Button
              variant="payment"
              type="submit"
              sx={{ width: 144, p: 2 }}
              id="cards"
              onClick={() => {
                sendGTMEvent({
                  event: 'ga4.trackEvent',
                  eventName: 'select_content',
                  eventParams: {
                    content_type: 'boton',
                    section: 'cobrar :: monto',
                    previous_section: 'dashboard',
                    selected_content: 'Tarjeta de crédito o débito',
                    destination_page: `${host}/dashboard/collect`,
                  },
                });
              }}
            >
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
