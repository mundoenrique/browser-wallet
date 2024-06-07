'use client';

import { useForm } from 'react-hook-form';
import { useCallback, useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import { Box, Button, Typography } from '@mui/material';
//Internal app
import { GroupIcon } from '%/Icons';
import { api } from '@/utils/api';
import { getSchema } from '@/config';
import { encryptForge, decryptForge } from '@/utils/toolHelper';
import Success from './partial/Success';
import { useMenuStore, useNavTitleStore, useUiStore, useUserStore, useOtpStore } from '@/store';
import { ContainerLayout, InputText, InputTextPay, ModalOtp } from '@/components';
import { TransferDetail } from '@/interfaces';

export default function Transfer() {
  const setCurrentItem = useMenuStore((state) => state.setCurrentItem);

  const updateTitle = useNavTitleStore((state) => state.updateTitle);

  const [openRc, setOpenRc] = useState<boolean>(false);

  const [openModalOtp, setOpenModalOtp] = useState<boolean>(false);

  const senderCardId = useUserStore((state) => state.getUserCardId);

  const { userId } = useUserStore((state) => state.user);

  const [transferInfo, setTransferInfo] = useState<TransferDetail>({
    receiver: '',
    amount: '',
    date: '',
    transactionCode: '',
  });

  const [receiverCardId, setReceiverCardId] = useState<string>('');

  const schema = getSchema(['numberClient', 'amount']);

  const setModalError = useUiStore((state) => state.setModalError);

  const setLoadingScreen = useUiStore((state) => state.setLoadingScreen);

  const otpUuid = useOtpStore((state) => state.otpUuid);

  const resetOtp = useOtpStore((state) => state.reset);

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

  const onSubmit = async (data: any) => {
    setLoadingScreen(true);

    const validateReceiver = api.get('/users/search', { params: { phoneNumber: data.numberClient } });

    const validateBalance = api.get(`/cards/${senderCardId()}/balance`);

    Promise.allSettled([validateReceiver, validateBalance])

      .then((responses: any) => {
        const [responseReceiver, responseBalance] = responses;

        const balance = responseBalance?.value?.data?.data?.availableBalance || 0;

        const amountCheck = data.amount < balance;

        if (responseReceiver.status === 'fulfilled' && responseBalance.status === 'fulfilled') {
          if (!amountCheck) {
            setError('amount', { type: 'customError', message: 'Saldo insuficiente' });
          } else {
            const {
              firstName,
              firstLastName,
              cardSolutions: { cardId },
            } = responseReceiver.value.data.data;

            setTransferInfo((prevState) => ({
              ...prevState,
              receiver: `${firstName} ${firstLastName}`,
              amount: parseFloat(data.amount).toFixed(2),
            }));

            setReceiverCardId(decryptForge(cardId));

            setOpenModalOtp(true);
          }
        } else if (responseReceiver.status === 'rejected' && responseBalance.status === 'fulfilled') {
          if (responseReceiver.reason.response.data?.data?.code === '400.00.033') {
            setError('numberClient', { type: 'customError', message: 'Este número no tiene Yiro' });
          } else {
            setModalError({ error: responseReceiver });
          }

          if (!amountCheck) {
            setError('amount', { type: 'customError', message: 'Saldo insuficiente' });
          }
        } else if (responseReceiver.status === 'fulfilled' && responseBalance.status === 'rejected') {
          setModalError({ error: responseBalance });
        } else if (responseReceiver.status === 'rejected' && responseBalance.status === 'rejected') {
          if (responseReceiver.reason.response.data?.data?.code === '400.00.033') {
            setError('numberClient', { type: 'customError', message: 'Este número no tiene Yiro' });
          } else {
            setModalError({ error: responseReceiver.reason.response.data?.data?.code });
          }
          setModalError({ error: responseBalance.reason.response.data?.data?.code });
        }
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
      amount: parseFloat(amount).toFixed(2),
      source: 'Web transfer',
      externalId: '0-web-transfer',
    };

    console.log(payload);
    api
      .post(`/cards/sendmoney`, payload)
      .then((response) => {
        const {
          data: {
            data: {
              data: { authCode },
            },
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

          <Button variant="contained" type="submit" fullWidth>
            Enviar
          </Button>
        </Box>
      </ContainerLayout>

      {openRc && (
        <Success
          onClick={() => {
            setOpenRc(false);
            resetForm();
          }}
          transferDetail={transferInfo}
        />
      )}

      {
        <ModalOtp
          open={openModalOtp}
          handleClose={() => {
            setOpenModalOtp(false);
          }}
          onSubmit={onSubmitOtp}
          processCode="TRANSFER_P2P_OTP"
        />
      }
    </>
  );
}
