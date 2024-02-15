'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Arrow from '@mui/icons-material/ArrowBackIos';
import { Box, Button, Typography, Link as LinkMui } from '@mui/material';
//Internal app
import { getSchema } from '@/config';
import { useForm } from 'react-hook-form';
import { useNavTitleStore } from '@/store';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputPass, ModalOtp, ModalResponsive } from '@/components';

export default function ChangePin() {
  const { updateTitle }: any = useNavTitleStore();
  const [openOtp, setOpenOtp] = useState(false);
  const [openRc, setOpenRc] = useState(false);
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
  }, []);

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
          Cambiar PIN
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
          A continuación puedes cambiar tu PIN, recuérdalo al momento de usar tu tarjeta
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <InputPass name="newPin" control={control} label="Nuevo Pin" />
          <InputPass name="confirmPin" control={control} label="Confirmar tu nuevo Pin" />
          <Button variant="contained" type="submit" fullWidth>
            Cambiar PIN
          </Button>
        </Box>
      </Box>

      <ModalOtp open={openOtp} handleClose={() => setOpenOtp(false)} onSubmit={onSubmitOtp} />

      <ModalResponsive open={openRc} handleClose={() => setOpenRc(false)}>
        <>
          <Typography variant="h6" mb={3}>
            🥳 Actualización exitosa
          </Typography>
          <Typography variant="body1" textAlign="center" mb={3}>
            El PIN de tu tarjeta ha sido actualizado con éxito.
          </Typography>
          <Button variant="contained" onClick={() => setOpenRc(false)} fullWidth>
            Ir al Inicio
          </Button>
        </>
      </ModalResponsive>
    </>
  );
}
