'use client';

import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography } from '@mui/material';
//Internal app
import { getSchema } from '@/config';
import ModalOtp from '@/components/modal/ModalOtp';
import { useNavTitleStore, useConfigCardStore } from '@/store';
import { ContainerLayout, InputRadio, Linking, ModalResponsive } from '@/components';

export default function Survey() {
  const { updateTitle } = useNavTitleStore();

  const { updatePage } = useConfigCardStore();

  const [openRc, setOpenRc] = useState<boolean>(false);

  const [openOtp, setOpenOtp] = useState<boolean>(false);

  const schema = getSchema(['blockType']);

  useEffect(() => {
    updateTitle('Ayúdanos con esta encuesta');
  }, [updateTitle]);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: { blockType: '' },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    console.log('🚀 ~ onSubmit ~ data:', data);
    setOpenOtp(true);
  };

  const onSubmitOtp = async (data: any) => {
    console.log(data);
    setOpenOtp(false);
    setOpenRc(true);
    reset();
  };

  const blockCardType = [
    {
      text: 'No la uso con frecuencia',
      value: '65',
    },
    {
      text: 'No me sirve para mi negocio',
      value: '66',
    },
    {
      text: 'Es complicada para usar',
      value: '67',
    },
    {
      text: 'Ya tengo otros medios pago',
      value: '68',
    },
    {
      text: 'No hay motivo solo quiero eliminar',
      value: '69',
    },
  ];

  return (
    <>
      <ContainerLayout>
        <Typography
          variant="h6"
          color="primary"
          sx={{ color: 'primary.main', mb: 6, display: { xs: 'none ', md: 'block' }, textAlign: 'center' }}
        >
          Ayúdanos con esta encuesta
        </Typography>

        <Linking
          onClick={() => {
            updatePage('main');
          }}
          href="#"
          label="Volver"
          adormentStart
        />

        <Typography variant="body2" mb={3}>
          Pensando siempre en darte la mejor propuesta de valor, quisiéramos saber el motivo por el que estás eliminando
          tu cuenta Yiro
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <InputRadio options={blockCardType} name="blockType" control={control} />
          <Button variant="contained" type="submit" fullWidth>
            Continuar
          </Button>
        </Box>
      </ContainerLayout>

      <ModalOtp
        open={openOtp}
        handleClose={() => setOpenOtp(false)}
        onSubmit={onSubmitOtp}
        title="🎰 Verifica tu identidad para eliminar cuenta"
        textButton="Eliminar cuenta Yiro"
        closeApp
        processCode="CHANGE_PASSWORD_OTP"
      />

      <ModalResponsive open={openRc} handleClose={() => setOpenRc(false)}>
        <Typography variant="subtitle1" mb={3}>
          🚫 Tu cuenta ha sido eliminada
        </Typography>
      </ModalResponsive>
    </>
  );
}
