'use client';

import { useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import Copy from '@mui/icons-material/ContentCopy';
import { Box, Button, Divider, IconButton, Typography } from '@mui/material';
//Internal app
import { useMenuStore } from '@/store';
import Qr from '%/images/arts/QR.png';
import { CardDetails, PurpleLayout } from '@/components';
import PagoEfectivo from '%/images/suppliers/pagoEfectivo.png';
import { fuchsiaBlue } from '@/theme/theme-default';

export default function Payment() {
  const componentRef = useRef<any>(null);
  const { setCurrentItem } = useMenuStore();
  const ImagePagoEfectivo = {
    src: PagoEfectivo,
    alt: 'Logo Pago Efectivo',
  };
  const handleConvert = async () => {
    const webShareSupported = 'canShare' in navigator;
    const shareData: any = {
      url: 'https://www.pagoefectivo.la/pe/como-pagar',
      files: [],
    };

    try {
      const canvas = await html2canvas(componentRef.current, {
        removeContainer: false,
        allowTaint: true,
        backgroundColor: fuchsiaBlue[700],
      });
      if (webShareSupported) {
        const blob: Blob = await new Promise((resolve: any) => canvas.toBlob(resolve, 'image/png'));
        const file: File = new File([blob], 'cobro.png', { type: 'image/png' });
        shareData['files'].push(file);
        await navigator.share(shareData);
      } else {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'imagen.png';
        link.click();
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    setCurrentItem('payment');
  }, [setCurrentItem]);

  return (
    <PurpleLayout>
      <Box sx={{ width: 320 }}>
        <Typography
          variant="h6"
          sx={{ display: { xs: 'none', sm: 'block' }, color: 'white', mb: 4, textAlign: 'center' }}
        >
          Crear solicitud de cobro
        </Typography>
        <Typography color="white" mb={4}>
          Comparte esta información para que te paguen a través de Pago Efectivo:
        </Typography>
        <Box ref={componentRef} sx={{ padding: '24px 4px 4px 4px', position: 'relative' }}>
          <CardDetails avatarImage={ImagePagoEfectivo}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center',
                alignItems: 'center',
                width: 140,
              }}
            >
              <Typography fontWeight={700} mb={3}>
                Pago en agentes ó banca en línea
              </Typography>
              <Typography variant="caption" mb={2}>
                Empresa: PagoEfectivo PagoEfectivo Soles
              </Typography>
              <Typography variant="caption" fontWeight={700}>
                Código CIP:
              </Typography>
              <Typography variant="h6" sx={{ display: 'flex', color: 'primary.main', alignItems: 'center' }}>
                112399769
                <IconButton aria-label="delete" size="small" sx={{ p: 0, ml: 3 / 2 }}>
                  <Copy sx={{ color: 'primary.main' }} />
                </IconButton>
              </Typography>
            </Box>
            <Divider orientation="vertical" variant="primary" flexItem />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: 140,
                textAlign: 'center',
              }}
            >
              <Typography fontWeight={700} mb={3}>
                Yape, Plin u otras billeteras:
              </Typography>

              <picture>
                <img src={Qr.src} alt="Qr Code" />
              </picture>
            </Box>
          </CardDetails>
        </Box>
        <Box
          sx={{
            bgcolor: 'secondary.dark',
            width: '100%',
            height: '59',
            textAlign: 'center',
            py: 3 / 2,
            borderRadius: '16px',
          }}
        >
          <Typography color="white" fontWeight={700}>
            Pago vigente hasta: 25 Enero
          </Typography>
          <Typography color="white" fontWeight={700}>
            Monto: S/100.00
          </Typography>
          <Typography color="white" fontWeight={700}>
            Cliente: Sandra Mejía
          </Typography>
        </Box>
        <Button variant="underline">¿Cómo me realizarán el pago?</Button>
        <Button variant="secondary" onClick={handleConvert}>
          Compartir
        </Button>
      </Box>
    </PurpleLayout>
  );
}
