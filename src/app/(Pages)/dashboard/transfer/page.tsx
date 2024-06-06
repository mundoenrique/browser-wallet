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
import { encryptForge } from '@/utils/toolHelper';
import Success from './partial/Success';
import { useMenuStore, useNavTitleStore, useUiStore, useUserStore, useOtpStore } from '@/store';
import { ContainerLayout, InputText, InputTextPay, ModalResponsive, ModalOtp } from '@/components';
import { TransferDetail } from '@/interfaces';

export default function Transfer() {
  const setCurrentItem = useMenuStore((state) => state.setCurrentItem);

  const updateTitle = useNavTitleStore((state) => state.updateTitle);

  const [openRc, setOpenRc] = useState<boolean>(false);

  const [openModalOtp, setOpenModalOtp] = useState<boolean>(false);

  const senderCardId = useUserStore((state) => state.getUserCardId);

  const { userId } = useUserStore((state) => state.user);

  const [transferInfo, setTransferInfo] = useState<TransferDetail>({ receiver: '', amount: '', date: '', code: '' });

  const [receiverCardId, setReceiverCardId] = useState<string>('');

  const schema = getSchema(['numberClient', 'amount']);

  const setModalError = useUiStore((state) => state.setModalError);

  const setLoadingScreen = useUiStore((state) => state.setLoadingScreen);

  const otpUuid = useOtpStore((state) => state.otpUuid);

  const resetOtp = useOtpStore((state) => state.reset);

  const { control, handleSubmit, reset, getValues, setError } = useForm({
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
              amount: data.amount,
            }));

            setReceiverCardId(cardId);

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
    setLoadingScreen(true);
    const dataForm = getValues();

    const payload = {
      sender: {
        cardId: senderCardId(),
      },
      receiver: {
        cardId: receiverCardId,
      },
      amount: dataForm.amount,
    };

    api
      .post(`/cards/${senderCardId()}/sendmoney`, payload)
      .then((response) => {
        const {
          data: { transactionIdentifier },
          dateTime,
        } = response.data;
        setOpenRc(true);
        setTransferInfo((prevState) => ({
          ...prevState,
          transactionId: transactionIdentifier,
          date: dayjs(dateTime).locale('es').format('dddd DD MMM - h:m a'),
        }));
      })
      .catch((e) => {
        setModalError({ error: e });
      })
      .finally(() => {
        reset();
        setLoadingScreen(false);
      });
  };

  const onSubmitOtp = useCallback(
    async (data: any) => {
      setLoadingScreen(true);
      const { otp } = data;

      const payload = {
        otpProcessCode: 'SEE_CARD_NUMBER',
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
        })
        .finally(() => {
          setLoadingScreen(false);
        });
    },
    [otpUuid] //eslint-disable-line
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

      {openRc && <Success onClick={() => setOpenRc(false)} transferDetail={transferInfo} />}

      {
        <ModalOtp
          open={openModalOtp}
          handleClose={() => {
            setOpenModalOtp(false);
          }}
          onSubmit={onSubmitOtp}
          processCode="SEE_CARD_NUMBER"
        />
      }
    </>
  );
}
