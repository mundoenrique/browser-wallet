'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Typography, Stack } from '@mui/material';
//Internal app
import { getSchema } from '@/config';
import { useForm } from 'react-hook-form';
import { useNavTitleStore, useConfigCardStore } from '@/store';
import { yupResolver } from '@hookform/resolvers/yup';
import { ContainerLayout, InputRadio, Linking, ModalResponsive } from '@/components';

export default function BlockCard() {
  const { updateTitle } = useNavTitleStore();
  const { updatePage } = useConfigCardStore();
  const [open, setOpen] = useState<boolean>(false);
  const schema = getSchema(['blockType']);

  const router = useRouter();

  useEffect(() => {
    updateTitle('Bloquear tarjeta');
  }, [updateTitle]);

  const { control, handleSubmit } = useForm({
    defaultValues: { blockType: '' },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    console.log('🚀 ~ onSubmit ~ data:', data);
    setOpen(!open);
  };

  const blockCardType = [
    {
      text: 'Por perdida(definitivo)',
      value: '41',
    },
    {
      text: 'Por robo (definitivo)',
      value: '42',
    },
    {
      text: 'Deterioro (definitivo)',
      value: '43',
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
          Bloquear tarjeta
        </Typography>

        <Linking
          href="#"
          onClick={() => {
            updatePage('main');
          }}
          label="Volver"
        />

        <Typography variant="body2" mb={3}>
          Selecciona una de las siguientes opciones para bloquear la tarjeta, dependiendo tu preferencia.
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <InputRadio options={blockCardType} name="blockType" control={control} />
          <Button variant="contained" type="submit" fullWidth>
            Bloquear
          </Button>
        </Box>
      </ContainerLayout>

      <ModalResponsive open={open} handleClose={() => setOpen(false)}>
        <Typography variant="subtitle1" mb={3}>
          🚫 Tarjeta Bloqueada
        </Typography>
        <Stack spacing={2} sx={{ textAlign: 'left' }} mb={3}>
          <Typography variant="body2">Tu tarjeta esta bloqueada.</Typography>
          <Typography variant="body2">Además estamos creándote una nueva cuenta Yiro Virtual</Typography>
          <Typography variant="body2">
            No te preocupes conservaras todos los datos de tu cuenta anterior y puedes seguir usando nuestros servicios.
          </Typography>
          <Typography variant="body2">Si quieres una nueva tarjeta física tienes que volver a solicitarla.</Typography>
          <Typography variant="body2">Si tienes afiliado un pago recurrente tienes que volver a generarlo.</Typography>
        </Stack>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(false);
            router.push('/dashboard');
          }}
          fullWidth
        >
          Crear nueva cuenta
        </Button>
      </ModalResponsive>
    </>
  );
}
