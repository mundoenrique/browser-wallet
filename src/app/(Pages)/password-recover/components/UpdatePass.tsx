'use client';

import { useState } from 'react';
import { Button, Typography } from '@mui/material';
//Internal app
import { FormPass, ModalResponsive } from '@/components';

export default function UpdatePass() {
  const [open, setOpen] = useState(false);

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
            <Typography fontWeight={700} textAlign="center" mb={3}>
              Crea una contraseña
            </Typography>

            <Typography mb={3} textAlign="center">
              Para poder continuar con tu proceso de activación, es necesario que crees una contraseña.
            </Typography>
          </>
        }
        buttons={
          <Button variant="primary" type="submit" sx={{ maxWidth: 284, width: '100%' }}>
            Continuar
          </Button>
        }
      />

      <ModalResponsive open={open} handleClose={() => setOpen(false)}>
        <>
          <Typography py={2} fontWeight={700}>
            📟 !Nueva contraseña!
          </Typography>
          <Typography textAlign="center">Tu contraseña ha sido actualizada exitosamente.</Typography>
        </>
      </ModalResponsive>
    </>
  );
}
