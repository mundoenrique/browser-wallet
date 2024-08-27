'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect, useState } from 'react';
import { sendGTMEvent } from '@next/third-parties/google';
import { Box, Button, Card, Stack, Typography } from '@mui/material';
//Internal app
import { api } from '@/utils/api';
import { getSchema } from '@/config';
import ModalOtp from '@/components/modal/ModalOtp';
import { fuchsiaBlue } from '@/theme/theme-default';
import { encryptForge, formatAmount } from '@/utils/toolHelper';
import { ContainerLayout, InputTextPay, Linking } from '@/components';
import {
  useDebStore,
  useHeadersStore,
  useMenuStore,
  useNavTitleStore,
  useOtpStore,
  useUiStore,
  useUserStore,
} from '@/store';

export default function Debt() {
  const schema = getSchema(['amount']);

  const debt = useDebStore((state) => state.debt);

  const host = useHeadersStore((state) => state.host);

  const balance = useDebStore((state) => state.balance);

  const otpUuid = useOtpStore((state) => state.otpUuid);

  const setView = useDebStore((state) => state.setView);

  const { userId } = useUserStore((state) => state.user);

  const setErrorStore = useDebStore((state) => state.setError);

  const setModalError = useUiStore((state) => state.setModalError);

  const setPayOffDebt = useDebStore((state) => state.setPayOffDebt);

  const updateTitle = useNavTitleStore((state) => state.updateTitle);

  const setCurrentItem = useMenuStore((state) => state.setCurrentItem);

  const setLoadingScreen = useUiStore((state) => state.setLoadingScreen);

  const [openOtp, setOpenOtp] = useState<boolean>(false);

  const [disableSubmit, setDisableSubmit] = useState<boolean>(false);

  useEffect(() => {
    sendGTMEvent({
      event: 'ga4.trackEvent',
      eventName: 'page_view_ga4',
      eventParams: {
        page_location: `${host}/dashboard/debt`,
        page_title: 'Yiro :: pagarDeuda :: monto',
        page_referrer: `${host}/dashboard`,
        section: 'Yiro :: pagarDeuda :: monto',
        previous_section: 'dashboard',
      },
    });
  }, [host]);

  const { control, handleSubmit, getValues, setError } = useForm({
    defaultValues: { amount: '' },
    resolver: yupResolver(schema),
  });

  const payOffDebt = useCallback(
    async () => {
      setLoadingScreen(true);
      const payload = {
        currencyCode: debt.currencyCode,
        amount: formatAmount(getValues('amount')),
        debt: debt.amount,
      };
      api
        .post(`/payments/${userId}/payoff`, payload)
        .then((response) => {
          setPayOffDebt(response.data.data);
          setView('SUCCESS');
        })
        .catch((e) => {
          setErrorStore(e.response.data.data);
          setView('ERROR');
        })
        .finally(() => {
          setLoadingScreen(false);
        });
    },
    [debt?.id] //eslint-disable-line react-hooks/exhaustive-deps
  );

  const onSubmitOtp = useCallback(
    async (data: any) => {
      setDisableSubmit(true);
      const { otp } = data;
      const payload = {
        otpProcessCode: 'DEBT_PAYMENT_OTP',
        otpUuId: otpUuid,
        otpCode: encryptForge(otp),
      };

      api
        .post(`/users/${userId}/validate/tfa`, payload)
        .then((response) => {
          if (response.data.code === '200.00.000') {
            setOpenOtp(false);
            payOffDebt();
          }
        })
        .catch((e) => {
          setModalError({ error: e });
          setLoadingScreen(false);
        })
        .finally(() => {
          setDisableSubmit(false);
        });
    },
    [otpUuid] //eslint-disable-line
  );

  const onSubmit = (data: any) => {
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

    const amount = parseFloat(data.amount);
    if (!balance || amount >= parseFloat(balance.availableBalance)) {
      setError('amount', {
        type: 'customError',
        message: 'No cuenta con saldo disponible.',
      });
      return;
    }
    setOpenOtp(true);
  };

  useEffect(() => {
    updateTitle('Pagar deuda con Belcorp');
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
          Pagar deuda con Belcorp
        </Typography>

        <Linking href="/dashboard" label="Volver" adormentStart />

        <Card sx={{ boxShadow: 'none', bgcolor: fuchsiaBlue[300], px: 3, py: 1, mb: 4, borderRadius: '16px' }}>
          <Stack spacing={1} sx={{ display: 'grid', justifyContent: 'center', justifyItems: 'center' }}>
            <Typography variant="body1" color="primary.main">
              Deuda total
            </Typography>
            <Typography variant="h6">{debt?.amount === 0 || !debt?.amount ? 'S/ 0.00' : debt?.amount}</Typography>
            <Typography variant="body2" color="primary.main">
              {debt?.expirationDate}
            </Typography>
          </Stack>
        </Card>

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <InputTextPay name="amount" control={control} label="¿Cuánto deseas pagar?" />
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
                  section: 'Yiro :: pagarDeuda :: monto',
                  previous_section: 'dashboard',
                  selected_content: 'Pagar',
                  destination_page: `${host}/dashboard/debt`,
                },
              });
            }}
          >
            Pagar
          </Button>
        </Box>
      </ContainerLayout>

      {openOtp && (
        <ModalOtp
          open={openOtp}
          handleClose={() => setOpenOtp(false)}
          onSubmit={onSubmitOtp}
          processCode="DEBT_PAYMENT_OTP"
          disableSubmit={disableSubmit}
        />
      )}
    </>
  );
}
