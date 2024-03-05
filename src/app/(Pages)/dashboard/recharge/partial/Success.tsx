'use client';

import { useState } from 'react';
import { Button, Typography } from '@mui/material';
//Internal app
import { ModalRecharge } from './ModalRecharge';
import { CardPagoEfectivo, ContainerLayout, PurpleLayout } from '@/components';

export default function Success() {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <PurpleLayout hidePelca bigModal left navbar>
        <ContainerLayout>
          <Typography
            variant="h6"
            sx={{ display: { xs: 'none', md: 'block' }, color: 'white', mb: 4, textAlign: 'center' }}
          >
            Generar recarga
          </Typography>
          <Typography color="white" fontSize={14}>
            Recarga a través de Pago Efectivo por una de estas 2 opciones:
          </Typography>
          <CardPagoEfectivo cip="112399768" label="Guardar código QR" download>
            <Button variant="underline" sx={{ mb: 2 }} onClick={() => setShowModal(true)}>
              ¿Cómo realizar la recarga?
            </Button>
          </CardPagoEfectivo>
        </ContainerLayout>
      </PurpleLayout>

      <ModalRecharge open={showModal} handleClose={() => setShowModal(false)} />
    </>
  );
}
