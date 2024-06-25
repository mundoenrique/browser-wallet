'use client';

import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { sendGTMEvent } from '@next/third-parties/google';
//Internal app
import { api } from '@/utils/api';
import { GroupIcon } from '%/Icons';
import { getSchema } from '@/config';
import Success from './partial/Success';
import { TransferDetail } from '@/interfaces';
import ModalOtp from '@/components/modal/ModalOtp';
import { encryptForge, decryptForge } from '@/utils/toolHelper';
import { ContainerLayout, InputText, InputTextPay } from '@/components';
import { useMenuStore, useNavTitleStore, useUiStore, useUserStore, useOtpStore, useHeadersStore } from '@/store';

export default function Transfer() {
  const host = useHeadersStore((state) => state.host);

  const resetOtp = useOtpStore((state) => state.reset);

  const otpUuid = useOtpStore((state) => state.otpUuid);

  const { userId } = useUserStore((state) => state.user);

  const setModalError = useUiStore((state) => state.setModalError);

  const senderCardId = useUserStore((state) => state.getUserCardId);

  const getUserPhone = useUserStore((state) => state.getUserPhone);

  const updateTitle = useNavTitleStore((state) => state.updateTitle);

  const setCurrentItem = useMenuStore((state) => state.setCurrentItem);

  const setLoadingScreen = useUiStore((state) => state.setLoadingScreen);

  const [openRc, setOpenRc] = useState<boolean>(false);

  const [receiverCardId, setReceiverCardId] = useState<string>('');

  const [openModalOtp, setOpenModalOtp] = useState<boolean>(false);

  const [transferInfo, setTransferInfo] = useState<TransferDetail>({
    receiver: '',
    amount: null,
    date: '',
    transactionCode: '',
  });

  const schema = getSchema(['numberClient', 'amount']);

  const {
    control,
    handleSubmit,
    reset: resetForm,
    getValues,
    setError,
  } = useForm({
    defaultValues: { numberClient: '', amount: '' },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    updateTitle('Transferir dinero');
    setCurrentItem('transfer');
  }, [updateTitle, setCurrentItem]);

  useEffect(() => {
    sendGTMEvent({
      event: 'ga4.trackEvent',
      eventName: 'page_view_ga4',
      eventParams: {
        page_location: `${host}/dashboard/transfer`,
        page_title: 'Yiro :: transferencia :: monto',
        page_referrer: `${host}/dashboard`,
        section: 'Yiro :: transferencia :: monto',
        previous_section: 'dashboard',
      },
    });
  }, [host]);

  const onSubmit = async (data: any) => {
    const validate = {
      min: parseFloat(data.amount) < 1,
      max: parseFloat(data.amount) > 4950,
      differentAccount: data.numberClient !== getUserPhone(),
    };

    if (!validate.differentAccount || validate.min || validate.max) {
      !validate.differentAccount &&
        setError('numberClient', { type: 'customError', message: 'No se puede transferir a la misma cuenta' });

      validate.min && setError('amount', { type: 'customError', message: 'El monto debe ser mayor a 1.00' });

      validate.max && setError('amount', { type: 'customError', message: 'El monto debe ser menor a 4950' });

      return;
    }

    setLoadingScreen(true);

    const validateReceiver = api.get('/users/search', { params: { phoneNumber: data.numberClient } });

    const validateBalance = api.get(`/cards/${senderCardId()}/balance`);

    Promise.allSettled([validateReceiver, validateBalance])

      .then((responses: any) => {
        const [responseReceiver, responseBalance] = responses;

        const balance = responseBalance.value?.data?.data?.availableBalance || 0;

        const amountCheck = parseFloat(data.amount) < parseFloat(balance);

        if (responseReceiver.status === 'fulfilled' && responseBalance.status === 'fulfilled') {
          if (!amountCheck) {
            setError('numberClient', { type: 'customError', message: 'Saldo insuficiente' });
          } else {
            const {
              firstName,
              firstLastName,
              cardSolutions: { cardId },
            } = responseReceiver.value?.data?.data;

            setTransferInfo((prevState) => ({
              ...prevState,
              receiver: `${firstName} ${firstLastName}`,
              amount: parseFloat(data.amount),
            }));

            setReceiverCardId(decryptForge(cardId));

            setOpenModalOtp(true);
          }
        } else if (responseReceiver.status === 'rejected' && responseBalance.status === 'fulfilled') {
          if (responseReceiver.reason?.response?.data?.data?.code === '400.00.033') {
            setError('numberClient', { type: 'customError', message: 'Este número no tiene Yiro' });
          } else {
            setModalError({ error: responseReceiver.reason });
          }

          if (!amountCheck) {
            setError('amount', { type: 'customError', message: 'Saldo insuficiente' });
          }
        } else if (responseReceiver.status === 'fulfilled' && responseBalance.status === 'rejected') {
          setModalError({ error: responseBalance.reason });
        } else if (responseReceiver.status === 'rejected' && responseBalance.status === 'rejected') {
          if (responseReceiver.reason?.response?.data?.data?.code === '400.00.033') {
            setError('numberClient', { type: 'customError', message: 'Este número no tiene Yiro' });
          } else {
            setModalError({ error: responseReceiver.reason });
          }
          setModalError({ error: responseBalance.reason });
        }
      })
      .catch(() => {
        setModalError();
      })
      .finally(() => {
        setLoadingScreen(false);
      });
  };

  const handleConfirmation = async () => {
    setLoadingScreen(true, { message: 'Comprobando transferencia' });
    const { amount }: { amount: string } = getValues();

    const payload = {
      sender: {
        cardId: senderCardId(),
      },
      receiver: {
        cardId: receiverCardId,
      },
      amount: amount,
      fee: '0.00',
      tax: '0.00',
      description: 'Web transfer',
      source: 'Web transfer',
      externalId: '-',
    };

    api
      .post(`/cards/sendmoney`, payload)
      .then((response) => {
        const {
          data: {
            data: { authCode },
            dateTime,
          },
        } = response;

        setOpenRc(true);

        setTransferInfo((prevState) => ({
          ...prevState,
          transactionCode: authCode,
          date: dayjs(dateTime).locale('es').format('dddd DD MMM - h:mm a'),
        }));
      })
      .catch((e) => {
        setModalError({ error: e });
      })
      .finally(() => {
        resetForm();
        setLoadingScreen(false);
      });
  };

  const onSubmitOtp = useCallback(
    async (data: any) => {
      setLoadingScreen(true);
      const { otp } = data;

      const payload = {
        otpProcessCode: 'TRANSFER_P2P_OTP',
        otpUuId: otpUuid,
        otpCode: encryptForge(otp),
      };

      api
        .post(`/users/${userId}/validate/tfa`, payload)
        .then((response) => {
          if (response.data.code === '200.00.000') {
            setOpenModalOtp(false);
            resetOtp();
            handleConfirmation();
          }
        })
        .catch((e) => {
          setModalError({ error: e });
          setLoadingScreen(false);
        });
    },
    [otpUuid, receiverCardId] //eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <>
      <ContainerLayout>
        <Typography
          variant="h6"
          color="primary"
          sx={{ color: 'primary.main', mb: 6, display: { xs: 'none ', md: 'block' }, textAlign: 'center' }}
        >
          Transferir dinero
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <InputText
            name="numberClient"
            control={control}
            label="¿A quién quieres transferir dinero?"
            endAdornment={<GroupIcon />}
          />
          <InputTextPay name="amount" control={control} label="¿Cuánto dinero quieres transferir?" />

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
                  section: 'Yiro :: transferencia :: monto',
                  previous_section: 'dashboard',
                  selected_content: 'Enviar',
                  destination_page: `${host}/dashboard`,
                },
              });
            }}
          >
            Enviar
          </Button>
        </Box>
      </ContainerLayout>

      {openRc && (
        <Success
          onClick={() => {
            setOpenRc(false);
          }}
          transferDetail={transferInfo}
        />
      )}

      {openModalOtp && (
        <ModalOtp
          open={openModalOtp}
          handleClose={() => {
            setOpenModalOtp(false);
          }}
          onSubmit={onSubmitOtp}
          processCode="TRANSFER_P2P_OTP"
        />
      )}
    </>
  );
}
