'use client';

import { useForm } from 'react-hook-form';
import { Suspense, useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import { Box, Button, Typography } from '@mui/material';
//Internal app
import { GroupIcon } from '%/Icons';
import { api } from '@/utils/api';
import { getSchema } from '@/config';
import Loading from './partial/Loading';
import Success from './partial/Success';
import { useMenuStore, useNavTitleStore, useUiStore, useUserStore } from '@/store';
import { ContainerLayout, InputText, InputTextPay, ModalResponsive } from '@/components';
import { TransferDetail } from '@/interfaces';

export default function Transfer() {
  const setCurrentItem = useMenuStore((state) => state.setCurrentItem);

  const updateTitle = useNavTitleStore((state) => state.updateTitle);

  const [openRc, setOpenRc] = useState<boolean>(false);

  const [openModal, setOpenModal] = useState<boolean>(false);

  const senderCardId = useUserStore((state) => state.getUserCardId);

  const [transferInfo, setTransferInfo] = useState<TransferDetail>({ receiver: '', amount: '', date: '', code: '' });

  const [receiverCardId, setReceiverCardId] = useState<string>('');

  const schema = getSchema(['numberClient', 'amount']);

  const setModalError = useUiStore((state) => state.setModalError);

  const setLoadingScreen = useUiStore((state) => state.setLoadingScreen);

  const { control, handleSubmit, reset, getValues, setError } = useForm({
    defaultValues: { numberClient: '', amount: '' },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    updateTitle('Transferir dinero');
    setCurrentItem('transfer');
  }, [updateTitle, setCurrentItem]);

  const onSubmit = async (data: any) => {
    setLoadingScreen(true, { message: 'Validando Transaccion' });

    const validateReceiver = api.get('/users/search', { params: { phoneNumber: data.numberClient } });

    const validateBalance = api.get(`/cards/${senderCardId}/balance`);

    Promise.allSettled([validateReceiver, validateBalance])
      .then((response: any) => {
        if (data.amount < response[1].data.data.balance) {
          setError('amount', { type: 'customError', message: 'Saldo insuficiente' });
        } else {
          const {
            firstName,
            firstLastName,
            cardSolutions: { cardId },
          } = response[0].data.data;
          setTransferInfo((prevState) => ({
            ...prevState,
            receiver: `${firstName} ${firstLastName}`,
            amount: data.amount,
          }));
          setReceiverCardId(cardId);
          setOpenModal(true);
        }

        if (response[0]?.data?.data?.code === '400.00.033') {
          setError('numberClient', { type: 'customError', message: 'Este número no tiene Yiro' });
        } else {
          //setModalError({ error: e });
        }
      })
      .finally(() => {
        // setLoadingScreen(false);
      });
  };

  const handleConfirmationModal = async () => {
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
        setOpenModal(false);
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

      <ModalResponsive data-testid="modalResponsive" open={openModal} handleClose={() => setOpenModal(false)}>
        <Typography variant="subtitle1" mb={3}>
          ✋¿Deseas transferir el dinero?
        </Typography>
        <Typography variant="body1" mb={3}>
          El monto total se transferirá en este momento
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            handleConfirmationModal();
          }}
          fullWidth
        >
          Aceptar
        </Button>
      </ModalResponsive>

      {openRc && <Success onClick={() => setOpenRc(false)} transferDetail={transferInfo} />}
    </>
  );
}
