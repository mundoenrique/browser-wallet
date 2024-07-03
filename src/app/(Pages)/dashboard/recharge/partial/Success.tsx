'use client';

import { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { sendGTMEvent } from '@next/third-parties/google';
//Internal app
import { ModalRecharge } from './ModalRecharge';
import { useCollectStore, useHeadersStore } from '@/store';
import { CardPagoEfectivo, ContainerLayout, Linking, PurpleLayout } from '@/components';

export default function Success() {
  const [showModal, setShowModal] = useState<boolean>(false);

  const host = useHeadersStore((state) => state.host);

  const linkData = useCollectStore((state) => state.linkData);

  const [qr, setQr] = useState<string>(linkData?.qr ?? '');

  const [url, setUrl] = useState<string>(linkData?.url ?? '');

  const [providerPaymentCode, setProviderPaymentCode] = useState<string>(linkData?.providerPaymentCode ?? '');

  useEffect(() => {
    setProviderPaymentCode(linkData?.providerPaymentCode ?? '');
    setUrl(linkData?.url ?? '');
    setQr(linkData?.qr ?? '');
  }, [linkData]);

  useEffect(() => {
    sendGTMEvent({
      event: 'ga4.trackEvent',
      eventName: 'page_view_ga4',
      eventParams: {
        page_location: `${host}/dashboard/recharge`,
        page_title: 'Yiro :: recargas :: realizarOperacion :: pagoEfectivo',
        page_referrer: `${host}/dashboard/recharge`,
        section: 'Yiro :: recargas :: realizarOperacion :: pagoEfectivo',
        previous_section: 'Yiro :: recargas :: monto',
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
            Generar recarga
          </Typography>
          <Typography color="white" fontSize={14}>
            Recarga a través de Pago Efectivo por una de estas 2 opciones:
          </Typography>
          <CardPagoEfectivo
            cip={providerPaymentCode}
            codeQr={qr}
            label="Guardar código QR"
            download
            downloadGA={() => {
              sendGTMEvent({
                event: 'ga4.trackEvent',
                eventName: 'select_content',
                eventParams: {
                  content_type: 'boton',
                  section: 'Yiro :: recargas :: realizarOperacion :: pagoEfectivo',
                  previous_section: 'Yiro :: recargas :: monto',
                  selected_content: 'Guardar código QR',
                  destination_page: `${host}/dashboard/recharge`,
                },
              });
            }}
          >
            <Button
              variant="underline"
              sx={{ mb: 2, fontSize: 16 }}
              onClick={() => {
                setShowModal(true);
                sendGTMEvent({
                  event: 'ga4.trackEvent',
                  eventName: 'select_content',
                  eventParams: {
                    content_type: 'boton',
                    section: 'Yiro :: recargas :: realizarOperacion :: pagoEfectivo',
                    previous_section: 'Yiro :: recargas :: monto',
                    selected_content: '¿Cómo realizar la recarga?',
                    destination_page: `${host}/dashboard/recharge`,
                  },
                });
              }}
            >
              ¿Cómo realizar la recarga?
            </Button>
          </CardPagoEfectivo>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
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
                    section: 'Yiro :: recargas :: realizarOperacion :: pagoEfectivo',
                    previous_section: 'Yiro :: recargas :: monto',
                    selected_content: 'Volver al inici',
                    destination_page: `${host}/dashboard`,
                  },
                });
              }}
            />
          </Box>
        </ContainerLayout>
      </PurpleLayout>

      <ModalRecharge
        open={showModal}
        handleClose={() => {
          setShowModal(false);
          sendGTMEvent({
            event: 'ga4.trackEvent',
            eventName: 'page_view_ga4',
            eventParams: {
              section: 'Yiro :: recargas :: realizarOperacion :: pagoEfectivo',
              previous_section: 'dashboard',
              pop_up_type: 'Recarga',
              pop_up_title: '¿Cómo realizar la recarga?',
              content_type: 'modal',
            },
          });
        }}
      />
    </>
  );
}
