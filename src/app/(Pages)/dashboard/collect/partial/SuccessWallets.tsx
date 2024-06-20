'use client';

import { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
//Internal app
import { useCollectStore } from '@/store';
import { ModalCollect } from './ModalCollect';
import { formattedSortDate } from '@/utils/dates';
import { CardInfoOperation, CardPagoEfectivo, ContainerLayout, Linking, PurpleLayout } from '@/components';

export default function SuccessWallets() {
  const load = useCollectStore((state) => state.load);

  const linkData = useCollectStore((state) => state.linkData);

  const [showModal, setShowModal] = useState<boolean>(false);

  const [name, setName] = useState<string>(load?.name ?? '');

  const [url, setUrl] = useState<string>(linkData?.url ?? '');

  const [amount, setAmount] = useState<number>(linkData?.amount ?? 0);

  const [expirationDate, setExpirationDate] = useState<string>(linkData?.expirationDate ?? '');

  const [providerPaymentCode, setProviderPaymentCode] = useState<string>(linkData?.providerPaymentCode ?? '');

  useEffect(() => {
    setProviderPaymentCode(linkData?.providerPaymentCode ?? '');
    setExpirationDate(linkData?.expirationDate ?? '');
    setUrl(linkData?.url ?? '');
    setAmount(linkData?.amount ?? 0);
    setName(load?.name ?? '');
  }, [linkData, load]);

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
          <CardPagoEfectivo cip={providerPaymentCode} label="Compartir" share>
            <CardInfoOperation date={formattedSortDate(expirationDate)} amount={amount} name={name} />
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
