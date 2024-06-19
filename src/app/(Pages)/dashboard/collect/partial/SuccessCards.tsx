'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';
//Internal app
import { CopyIcons } from '%/Icons';
import { ModalCollect } from './ModalCollect';
import { CardInfoOperation, CardReport, ContainerLayout, Linking, PurpleLayout } from '@/components';
import { useCollectStore } from '@/store';
import { formattedSortDate } from '@/utils/dates';

export default function SuccessCards() {
  const textRef = useRef<null>(null);

  const [showModal, setShowModal] = useState<boolean>(false);

  const linkData = useCollectStore((state) => state.linkData);
  const load = useCollectStore((state) => state.load);

  const [amount, setAmount] = useState<number>(linkData?.amount ?? 0);
  const [expirationDate, setExpirationDate] = useState<string>(linkData?.expirationDate ?? '');
  const [url, setUrl] = useState<string>(linkData?.url ?? '');
  const [name, setName] = useState<string>(load?.name ?? '');

  const handleShareText = async () => {
    try {
      await navigator.share({
        title: 'Enlace de cobro',
        text: url,
      });
    } catch (error) {
      console.error('Error sharing text:', error);
    }
  };

  useEffect(() => {
    setAmount(linkData?.amount ?? 0);
    setName(load?.name ?? '');
    setExpirationDate(linkData?.expirationDate ?? '');
    setUrl(linkData?.url ?? '');
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
          <Typography color="white" mb={4} fontSize={14} ref={textRef}>
            Comparte esta información para que te paguen con tarjeta de crédito o débito
          </Typography>
          <CardReport avatarText="TC">
            <Typography
              variant="h6"
              sx={{
                display: 'flex',
                color: 'primary.main',
                maxWidth: { xs: 200 },
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
            >
              {url}
            </Typography>
            <CopyToClipboard text={url}>
              <IconButton aria-label="delete" size="small" sx={{ p: 0, ml: 1 }}>
                <CopyIcons sx={{ color: 'primary.main' }} />
              </IconButton>
            </CopyToClipboard>
          </CardReport>

          <CardInfoOperation date={formattedSortDate(expirationDate)} amount={amount} name={name} />

          <Button variant="underline" sx={{ mb: 2 }} onClick={() => setShowModal(true)}>
            ¿Cómo me realizarán el pago?
          </Button>

          <Button variant="secondary" onClick={handleShareText} sx={{ mb: 4 }}>
            Compartir
          </Button>

          <Box sx={{ width: '100%', display: { xs: 'flex', md: 'none' }, justifyContent: 'center' }}>
            <Linking href="/dashboard" label="Volver al inicio" hidenArrow color="white" underline fontSize={16} />
          </Box>
        </ContainerLayout>
      </PurpleLayout>

      <ModalCollect open={showModal} handleClose={() => setShowModal(false)} />
    </>
  );
}
