'use client';

import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
//Internal app
import { ModalCollect } from './ModalCollect';
import { CardInfoOperation, CardPagoEfectivo, ContainerLayout, Linking, PurpleLayout } from '@/components';

export default function SuccessWallets() {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <PurpleLayout hidePelca bigModal left navbar>
        <ContainerLayout>
          <Typography
            variant="h6"
            sx={{ display: { xs: 'none', md: 'block' }, color: 'white', mb: 4, textAlign: 'center' }}
          >
            Crear solicitud de cobro
          </Typography>
          <Typography color="white" fontSize={14}>
            Comparte esta información para que te paguen a través de Pago Efectivo:
          </Typography>
          <CardPagoEfectivo cip="112399768" label="Compartir" share>
            <CardInfoOperation date="25 Enero" amount="100.00" name="Sandra Mejía" />
            <Button variant="underline" sx={{ mb: 2 }} onClick={() => setShowModal(true)}>
              ¿Cómo me realizarán el pago?
            </Button>
          </CardPagoEfectivo>

          <Box sx={{ width: '100%', display: { xs: 'flex', md: 'none' }, justifyContent: 'center' }}>
            <Linking href="/dashboard" label="Volver al inicio" hidenArrow color="white" underline fontSize={16} />
          </Box>
        </ContainerLayout>
      </PurpleLayout>

      <ModalCollect open={showModal} handleClose={() => setShowModal(false)} />
    </>
  );
}
