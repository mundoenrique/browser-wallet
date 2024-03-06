'use client';

import { useForm } from 'react-hook-form';
import { Suspense, useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography } from '@mui/material';
//Internal app
import { GroupIcon } from '%/Icons';
import { getSchema } from '@/config';
import Loading from './partial/Loading';
import Success from './partial/Success';
import { useMenuStore, useNavTitleStore } from '@/store';
import { ContainerLayout, InputText, InputTextPay, ModalResponsive } from '@/components';

export default function Transfer() {
  const [openRc, setOpenRc] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [dataForm, setDataForm] = useState<any>();
  const { updateTitle } = useNavTitleStore();
  const { setCurrentItem } = useMenuStore();
  const schema = getSchema(['numberClient', 'amount']);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: { numberClient: '', amount: '' },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    updateTitle('Transferir dinero');
    setCurrentItem('transfer');
  }, [updateTitle, setCurrentItem]);

  const onSubmit = (data: any) => {
    setDataForm(data);
    setOpenModal(true);
  };

  const handleConfirmationModal = async () => {
    console.log('🚀 ~ onSubmit ~ data:', dataForm);
    setOpenModal(false);
    setOpenRc(true);
    reset();
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

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
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

      <ModalResponsive open={openModal} handleClose={() => setOpenModal(false)}>
        <Typography variant="subtitle1" mb={3}>
          ✋¿Deseas transferir el dinero?
        </Typography>
        <Typography variant="body1" mb={3}>
          El monto total se transferirá en este momento
        </Typography>
        <Button variant="contained" onClick={handleConfirmationModal} fullWidth>
          Aceptar
        </Button>
      </ModalResponsive>

      {openRc && (
        <Suspense fallback={<Loading />}>
          <Success onClick={() => setOpenRc(false)} />
        </Suspense>
      )}
    </>
  );
}
