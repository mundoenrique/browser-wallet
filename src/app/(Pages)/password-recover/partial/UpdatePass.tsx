'use client';

import { useState } from 'react';
import { Button, Typography } from '@mui/material';
//Internal app
import { FormPass, ModalResponsive } from '@/components';

export default function UpdatePass() {
  const [open, setOpen] = useState<boolean>(false);

  const onSubmit = async (data: any) => {
    console.log(data);
    setOpen(true);
  };

  return (
    <>
      <FormPass
        onSubmit={onSubmit}
        description={
          <>
            <Typography sx={{ mb: 3, fontWeight: 700, textAlign: { md: 'center' } }}>
              Recuperar tu contraseña
            </Typography>

            <Typography variant="body2" fontWeight={700}>
              Elige 6 números que recuerdes.
            </Typography>
            <Typography mb={3} variant="body2">
              Evita fechas de cumpleaños, números consecutivos ó iguales.
            </Typography>
          </>
        }
        buttons={
          <Button variant="primary" type="submit" sx={{ maxWidth: 284, width: '100%' }}>
            Guardar
          </Button>
        }
      />

      <ModalResponsive open={open} handleClose={() => setOpen(false)}>
        <Typography py={2} fontWeight={700}>
          📟 !Nueva contraseña!
        </Typography>
        <Typography textAlign="center">Tu contraseña ha sido actualizada exitosamente.</Typography>
      </ModalResponsive>
    </>
  );
}
