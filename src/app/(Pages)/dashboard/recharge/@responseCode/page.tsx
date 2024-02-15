'use client';

import { useRef } from 'react';
import html2canvas from 'html2canvas';
import Copy from '@mui/icons-material/ContentCopy';
import { Box, Button, Divider, IconButton, Typography } from '@mui/material';
//Internal app
import Qr from '%/images/arts/QR.png';
import { CardDetails, PurpleLayout } from '@/components';
import PagoEfectivo from '%/images/suppliers/pagoEfectivo.png';
import { fuchsiaBlue } from '@/theme/theme-default';

export default function ResponseCode() {
  const componentRef = useRef<any>(null);
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
        backgroundColor: fuchsiaBlue[800],
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

  return (
    <PurpleLayout hidePelca>
      <Box sx={{ width: 320 }}>
        <Typography
          variant="h6"
          sx={{ display: { xs: 'none', sm: 'block' }, color: 'white', mb: 4, textAlign: 'center' }}
        >
          Generar recarga
        </Typography>
        <Typography color="white" mb={4} fontSize={14}>
          Recarga a través de Pago Efectivo por una de estas 2 opciones:
        </Typography>
        <Box ref={componentRef} sx={{ padding: '24px 4px 4px 4px', position: 'relative' }}>
          <CardDetails avatarImage={ImagePagoEfectivo}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center',
                alignItems: 'center',
                width: '140px',
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
                <IconButton aria-label="delete" size="small" sx={{ p: 0, ml: '12px' }}>
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
                width: '140px',
                textAlign: 'center',
              }}
            >
              <Typography fontWeight={700} mb={3}>
                Yape, Plin u otras billeteras:
              </Typography>

              <img src={Qr.src} />
            </Box>
          </CardDetails>
        </Box>

        <Button variant="underline" sx={{ mb: 4 }}>
          ¿Cómo realizar la recarga?
        </Button>
        <Button variant="secondary" onClick={handleConvert}>
          Guardar Código QR
        </Button>
      </Box>
    </PurpleLayout>
  );
}
