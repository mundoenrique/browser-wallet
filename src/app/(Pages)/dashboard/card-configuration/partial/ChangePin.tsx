'use client';

import { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
//Internal app
import { getSchema } from '@/config';
import { useForm } from 'react-hook-form';
import { useNavTitleStore, useConfigCardStore } from '@/store';
import ModalOtp from '@/components/modal/ModalOtp';
import { yupResolver } from '@hookform/resolvers/yup';
import { ContainerLayout, InputPass, Linking, ModalResponsive } from '@/components';

export default function ChangePin() {
  const { updateTitle } = useNavTitleStore();
  const { updatePage } = useConfigCardStore();
  const [openOtp, setOpenOtp] = useState<boolean>(false);
  const [openRc, setOpenRc] = useState<boolean>(false);
  const schemaFormPassword = getSchema(['newPin', 'confirmPin']);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: { newPin: '', confirmPin: '' },
    resolver: yupResolver(schemaFormPassword),
  });

  const onSubmit = async (data: any) => {
    console.log(data);
    setOpenOtp(true);
  };

  const onSubmitOtp = async (data: any) => {
    console.log(data);
    setOpenOtp(false);
    setOpenRc(true);
    reset();
  };

  useEffect(() => {
    updateTitle('Cambiar PIN');
  }, [updateTitle]);

  return (
    <>
      <ContainerLayout>
        <Typography
          variant="h6"
          color="primary"
          sx={{ color: 'primary.main', mb: 6, display: { xs: 'none ', md: 'block' }, textAlign: 'center' }}
        >
          Cambiar PIN
        </Typography>

        <Linking
          href="#"
          label="Volver"
          onClick={() => {
            updatePage('main');
          }}
        />

        <Typography variant="body2" mb={3}>
          A continuación puedes cambiar tu PIN, recuérdalo al momento de usar tu tarjeta
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <InputPass name="newPin" control={control} label="Nuevo Pin" />
          <InputPass name="confirmPin" control={control} label="Confirmar tu nuevo Pin" />
          <Button variant="contained" type="submit" fullWidth>
            Cambiar PIN
          </Button>
        </Box>
      </ContainerLayout>

      <ModalOtp open={openOtp} handleClose={() => setOpenOtp(false)} onSubmit={onSubmitOtp} />

      <ModalResponsive open={openRc} handleClose={() => setOpenRc(false)}>
        <Typography variant="h6" mb={3}>
          🥳 Actualización exitosa
        </Typography>
        <Typography variant="body1" textAlign="center" mb={3}>
          El PIN de tu tarjeta ha sido actualizado con éxito.
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            setOpenRc(false);
            updatePage('main');
          }}
          fullWidth
        >
          Ir al Inicio
        </Button>
      </ModalResponsive>
    </>
  );
}
