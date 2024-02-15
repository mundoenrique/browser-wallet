'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Arrow from '@mui/icons-material/ArrowBackIos';
import { Box, Button, Typography, Link as LinkMui, Stack } from '@mui/material';
//Internal app
import { getSchema } from '@/config';
import { useForm } from 'react-hook-form';
import { useNavTitleStore } from '@/store';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputRadio, ModalResponsive } from '@/components';

export default function BlockCard() {
  const { updateTitle }: any = useNavTitleStore();
  const [open, setOpen] = useState(false);
  const schema = getSchema(['blockType']);

  useEffect(() => {
    updateTitle('Bloquear tarjeta');
  }, []);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      blockType: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    console.log('🚀 ~ onSubmit ~ data:', data);
    setOpen(!open);
  };

  const blockCardType = [
    {
      text: 'Temporal',
      value: 'PB',
    },
    {
      text: 'Por perdida o robo (definitivo)',
      value: '41',
    },
    {
      text: 'Deterioro (definitivo)',
      value: '43',
    },
  ];

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: { xs: 'flex-start', md: 'center' },
          width: 320,
          minHeight: '100vh',
          mx: { xs: 'auto', md: 3 },
        }}
      >
        <Typography
          variant="h6"
          color="primary"
          sx={{ color: 'primary.main', mb: 6, display: { xs: 'none ', md: 'block' }, textAlign: 'center' }}
        >
          Bloquear tarjeta
        </Typography>

        <LinkMui
          component={Link}
          href="/dashboard/help"
          underline="none"
          sx={{ display: 'flex', alignItems: 'center', mb: 4 }}
          fontWeight={700}
          fontSize="12px"
        >
          <Arrow sx={{ mr: 2, width: 14, height: 14 }} />
          Volver
        </LinkMui>

        <Typography variant="body2" mb={3}>
          Selecciona una de las siguientes opciones para bloquear la tarjeta, dependiendo tu preferencia.
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <InputRadio options={blockCardType} name="blockType" control={control} />
          <Button variant="contained" type="submit" fullWidth>
            Bloquear
          </Button>
        </Box>
      </Box>

      <ModalResponsive open={open} handleClose={() => setOpen(false)}>
        <>
          <Typography variant="subtitle1" mb={3}>
            🚫 Tarjeta Bloqueada
          </Typography>
          <Stack spacing={2} sx={{ textAlign: 'left' }} mb={3}>
            <Typography variant="body2">Estamos bloqueando esta tarjeta.</Typography>
            <Typography variant="body2">
              Para que puedas seguir con tus transacciones, estamos creando una nueva cuenta Yiro virtual.
            </Typography>
            <Typography variant="body2">
              Si quieres una nueva tarjeta física tienes que volver a solicitarla.
            </Typography>
            <Typography variant="body2">
              Si tienes afiliado un pago recurrente tienes que volver a generarlo.
            </Typography>
          </Stack>
          <Button variant="contained" onClick={() => setOpen(false)} fullWidth>
            Entendido
          </Button>
        </>
      </ModalResponsive>
    </>
  );
}
