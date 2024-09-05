'use client';

import { useEffect, useRef, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { sendGTMEvent } from '@next/third-parties/google';
import { Box, Button, IconButton, Typography } from '@mui/material';
//Internal app
import { CopyIcons } from '%/Icons';
import { ModalCollect } from './ModalCollect';
import { formattedSortDate } from '@/utils/dates';
import { useCollectStore, useHeadersStore } from '@/store';
import { CardInfoOperation, CardReport, ContainerLayout, Linking, PurpleLayout } from '@/components';

export default function SuccessCards() {
  const textRef = useRef<null>(null);

  const host = useHeadersStore((state) => state.host);

  const load = useCollectStore((state) => state.load);

  const linkData = useCollectStore((state) => state.linkData);

  const [showModal, setShowModal] = useState<boolean>(false);

  const [name, setName] = useState<string>(load?.name ?? '');

  const [url, setUrl] = useState<string>(linkData?.url ?? '');

  const [amount, setAmount] = useState<number>(linkData?.amount ?? 0);

  const [expirationDate, setExpirationDate] = useState<string>(linkData?.expirationDate ?? '');

  useEffect(() => {
    sendGTMEvent({
      event: 'ga4.trackEvent',
      eventName: 'page_view_ga4',
      eventParams: {
        page_location: `${host}/dashboard/collect/realizarOperacion/tarjeta`,
        page_title: 'cobrar :: realizarOperacion :: tarjeta',
        page_referrer: `${host}/dashboard/collect`,
        section: 'cobrar :: realizarOperacion :: tarjeta',
        previous_section: 'cobrar',
      },
    });
  }, [host]);

  const handleShareText = async () => {
    try {
      await navigator.share({
        title: 'Enlace de cobro',
        text: url,
      });
    } catch (error) {
      console.error('Error sharing text:', error);
    }

    sendGTMEvent({
      event: 'ga4.trackEvent',
      eventName: 'select_content',
      eventParams: {
        content_type: 'boton',
        section: 'cobrar :: realizarOperacion :: pagoEfectivo',
        previous_section: 'cobrar',
        selected_content: 'Compartir',
        destination_page: `${host}/dashboard/collect`,
      },
    });
  };

  useEffect(() => {
    setAmount(linkData?.amount ?? 0);
    setName(load?.name ?? '');
    setExpirationDate(linkData?.expirationDate ?? '');
    setUrl(linkData?.url ?? '');
  }, [linkData, load]);

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
          <Typography color="white" mb={4} fontSize={14} ref={textRef}>
            Comparte esta información para que te paguen con tarjeta de crédito o débito
          </Typography>
          <CardReport avatarText="TC">
            <Typography variant="h6" noWrap width={260} sx={{ display: 'flex', color: 'primary.main' }}>
              {url}
            </Typography>
            <CopyToClipboard text={url}>
              <IconButton aria-label="delete" size="small" sx={{ p: 0, ml: 1 }}>
                <CopyIcons sx={{ color: 'primary.main' }} />
              </IconButton>
            </CopyToClipboard>
          </CardReport>

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

          <Button variant="secondary" onClick={handleShareText} sx={{ mb: 4 }}>
            Compartir
          </Button>

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
        type='cash'
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
