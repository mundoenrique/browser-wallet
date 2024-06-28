'use client';

import { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
//Internal app
import { useCollectStore } from '@/store';
import { ModalRecharge } from './ModalRecharge';
import { CardPagoEfectivo, ContainerLayout, Linking, PurpleLayout } from '@/components';

export default function Success() {
  const [showModal, setShowModal] = useState<boolean>(false);

  const linkData = useCollectStore((state) => state.linkData);

  const [qr, setQr] = useState<string>(linkData?.qr ?? '');

  const [url, setUrl] = useState<string>(linkData?.url ?? '');

  const [providerPaymentCode, setProviderPaymentCode] = useState<string>(linkData?.providerPaymentCode ?? '');

  useEffect(() => {
    setProviderPaymentCode(linkData?.providerPaymentCode ?? '');
    setUrl(linkData?.url ?? '');
    setQr(linkData?.qr ?? '');
  }, [linkData]);

  return (
    <>
      <PurpleLayout hidePelca bigModal left navbar width="calc(100% - 315px)">
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
          <CardPagoEfectivo cip={providerPaymentCode} codeQr={qr} label="Guardar código QR" download>
            <Button variant="underline" sx={{ mb: 2, fontSize: 16 }} onClick={() => setShowModal(true)}>
              ¿Cómo realizar la recarga?
            </Button>
          </CardPagoEfectivo>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Linking href="/dashboard" label="Volver al inicio" hidenArrow color="white" underline fontSize={16} />
          </Box>
        </ContainerLayout>
      </PurpleLayout>

      <ModalRecharge open={showModal} handleClose={() => setShowModal(false)} />
    </>
  );
}
