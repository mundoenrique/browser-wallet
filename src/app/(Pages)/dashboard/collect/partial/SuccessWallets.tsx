'use client';

import { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { sendGTMEvent } from '@next/third-parties/google';
//Internal app
import { ModalCollect } from './ModalCollect';
import { formattedSortDate } from '@/utils/dates';
import { useCollectStore, useHeadersStore } from '@/store';
import { CardInfoOperation, CardPagoEfectivo, ContainerLayout, Linking, PurpleLayout } from '@/components';

export default function SuccessWallets() {
  const host = useHeadersStore((state) => state.host);

  const load = useCollectStore((state) => state.load);

  const linkData = useCollectStore((state) => state.linkData);

  const [qr, setQr] = useState<string>(linkData?.qr ?? '');

  const [showModal, setShowModal] = useState<boolean>(false);

  const [name, setName] = useState<string>(load?.name ?? '');

  const [amount, setAmount] = useState<number>(linkData?.amount ?? 0);

  const [expirationDate, setExpirationDate] = useState<string>(linkData?.expirationDate ?? '');

  const [providerPaymentCode, setProviderPaymentCode] = useState<string>(linkData?.providerPaymentCode ?? '');

  useEffect(() => {
    setProviderPaymentCode(linkData?.providerPaymentCode ?? '');
    setExpirationDate(linkData?.expirationDate ?? '');
    setAmount(linkData?.amount ?? 0);
    setName(load?.name ?? '');
    setQr(linkData?.qr ?? '');
  }, [linkData, load]);

  useEffect(() => {
    sendGTMEvent({
      event: 'ga4.trackEvent',
      eventName: 'page_view_ga4',
      eventParams: {
        page_location: `${host}dashboard/collect/realizarOperacion/pagoEfectivo`,
        page_title: 'cobrar :: realizarOperacion :: pagoEfectivo',
        page_referrer: `${host}/dashboard/collect`,
        section: 'cobrar :: realizarOperacion :: pagoEfectivo',
        previous_section: 'cobrar',
      },
    });
  }, [host]);

  return (
    <>
      <PurpleLayout hidePelca bigModal left navbar width="calc(100% - 315px)">
        <ContainerLayout>
          <Typography
            variant="h6"
            sx={{ display: { xs: 'none', md: 'block' }, color: 'white', mb: 4, textAlign: 'center' }}
          >
            Crear solicitud de cobro
          </Typography>
          <Typography color="white" fontSize={14}>
            Comparte esta información para que te paguen a través de PagoEfectivo:
          </Typography>
          <CardPagoEfectivo cip={providerPaymentCode} codeQr={qr} label="Compartir" share>
            <CardInfoOperation date={formattedSortDate(expirationDate)} amount={amount} name={name} />
            <Button
              variant="underline"
              sx={{ mb: 2 }}
              onClick={() => {
                setShowModal(true);
                sendGTMEvent({
                  event: 'ga4.trackEvent',
                  eventName: 'select_content',
                  eventParams: {
                    content_type: 'boton',
                    section: 'cobrar :: realizarOperacion :: pagoEfectivo',
                    previous_section: 'cobrar',
                    selected_content: '¿Cómo me realizarán el pago?',
                    destination_page: `${host}/dashboard/collect`,
                  },
                });
              }}
            >
              ¿Cómo me realizarán el pago?
            </Button>
          </CardPagoEfectivo>

          <Box sx={{ width: '100%', display: { xs: 'flex', md: 'none' }, justifyContent: 'center' }}>
            <Linking
              href="/dashboard"
              label="Volver al inicio"
              hidenArrow
              color="white"
              underline
              fontSize={16}
              onClick={() => {
                sendGTMEvent({
                  event: 'ga4.trackEvent',
                  eventName: 'select_content',
                  eventParams: {
                    content_type: 'boton',
                    section: 'cobrar :: realizarOperacion :: pagoEfectivo',
                    previous_section: 'cobrar',
                    selected_content: 'Volver al inicio',
                    destination_page: `${host}/dashboard`,
                  },
                });
              }}
            />
          </Box>
        </ContainerLayout>
      </PurpleLayout>

      <ModalCollect
        type="wallet"
        open={showModal}
        handleClose={() => {
          setShowModal(false);
          sendGTMEvent({
            event: 'ga4.trackEvent',
            eventName: 'select_content',
            eventParams: {
              content_type: 'boton_modal',
              section: 'cobrar :: realizarOperacion :: pagoEfectivo',
              previous_section: 'cobrar',
              selected_content: 'Cerrar',
              destination_page: `${host}/dashboard/collect`,
              pop_up_type: 'Cobro',
              pop_up_title: '¿Cómo realizar la recarga?',
            },
          });
        }}
      />
    </>
  );
}
