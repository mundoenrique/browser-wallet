'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { sendGTMEvent } from '@next/third-parties/google';
//Internal app
import { api } from '@/utils/api';
import { getSchema } from '@/config';
import Success from './partial/Success';
import { formatAmount } from '@/utils/toolHelper';
import { ContainerLayout, InputTextPay } from '@/components';
import { useNavTitleStore, useMenuStore, useUserStore, useCollectStore, useUiStore, useHeadersStore } from '@/store';

export default function Recharge() {
  const schema = getSchema(['amount']);

  const { setCurrentItem } = useMenuStore();

  const { updateTitle } = useNavTitleStore();

  const host = useHeadersStore((state) => state.host);

  const userId = useUserStore((state) => state.user.userId);

  const firstName = useUserStore((state) => state.user.firstName);

  const setModalError = useUiStore((state) => state.setModalError);

  const getUserPhone = useUserStore((state) => state.getUserPhone);

  const setLinkData = useCollectStore((state) => state.setLinkData);

  const setLoadingScreen = useUiStore((state) => state.setLoadingScreen);

  const firstLastName = useUserStore((state) => state.user.firstLastName);

  const [openRc, setOpenRc] = useState<boolean>(false);

  useEffect(() => {
    sendGTMEvent({
      event: 'ga4.trackEvent',
      eventName: 'page_view_ga4',
      eventParams: {
        page_location: `${host}/dashboard/recharge`,
        page_title: 'Yiro :: recargas :: monto',
        page_referrer: `${host}/dashboard`,
        section: 'Yiro :: recargas :: monto',
        previous_section: 'dashboard',
      },
    });
  }, [host]);

  useEffect(() => {
    updateTitle('Generar recarga');
    setCurrentItem('recharge');
  }, [updateTitle, setCurrentItem]);

  const { control, handleSubmit, getValues, setError, reset } = useForm({
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
        reset();
      });
  }, [setLoadingScreen, firstName, firstLastName, getUserPhone, getValues, userId, setLinkData, setModalError, reset]);

  const onSubmit = async (data: any) => {
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
          <Button
            variant="contained"
            type="submit"
            fullWidth
            onClick={() => {
              sendGTMEvent({
                event: 'ga4.trackEvent',
                eventName: 'select_content',
                eventParams: {
                  content_type: 'boton',
                  section: 'Yiro :: recargas :: monto',
                  previous_section: 'dashboard',
                  selected_content: 'Recargar',
                  destination_page: `${host}/dashboard/recharge`,
                },
              });
            }}
          >
            Recargar
          </Button>
        </Box>
      </ContainerLayout>

      {openRc && <Success />}
    </>
  );
}
