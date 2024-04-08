'use client';

import { useRef, useState } from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
//Internal app
import { CopyIcons } from '%/Icons';
import { ModalCollect } from './ModalCollect';
import { copyToClipboard } from '@/utils/toolHelper';
import { CardInfoOperation, CardReport, ContainerLayout, Linking, PurpleLayout } from '@/components';

export default function SuccessCards() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const textRef = useRef<null>(null);

  copyToClipboard('https://link.io/1234');

  const handleShareText = async () => {
    try {
      await navigator.share({
        title: 'Enlace de cobro',
        text: 'https://link.io/1234',
      });
    } catch (error) {
      console.error('Error sharing text:', error);
    }
  };

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
            <Typography variant="h6" sx={{ display: 'flex', color: 'primary.main', alignItems: 'center', pb: 1 }}>
              https://link.io/1234
              <IconButton aria-label="delete" size="small" sx={{ p: 0, ml: 1 }} onClick={copyToClipboard}>
                <CopyIcons sx={{ color: 'primary.main' }} />
              </IconButton>
            </Typography>
          </CardReport>

          <CardInfoOperation date="25 Enero" amount="100.00" name="Sandra Mejía" />

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
