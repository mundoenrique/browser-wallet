'use client';

import { useRef } from 'react';
import html2canvas from 'html2canvas';
import { Box, Button, Divider, IconButton, Typography } from '@mui/material';
//Internal app
import { CopyIcons } from '%/Icons';
import Qr from '%/images/arts/QR.png';
import CardReport from './CardReport';
import { fuchsiaBlue } from '@/theme/theme-default';
import PagoEfectivo from '%/images/suppliers/pagoEfectivo.png';

export default function CardPagoEfectivo({ cip, children, label, download, share }: any) {
  const componentRef = useRef<any>(null);
  const ImagePagoEfectivo = {
    src: PagoEfectivo,
    alt: 'Logo Pago Efectivo',
  };

  const handleShare = async () => {
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

  const handleDownLoad = async () => {
    const canvas = await html2canvas(componentRef.current, {
      removeContainer: false,
      allowTaint: true,
      backgroundColor: fuchsiaBlue[800],
    });
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = 'recarga.png';
    link.click();
  };

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(cip);
    } catch (error) {
      console.error('Error copying text:', error);
    }
  };

  return (
    <>
      <Box ref={componentRef} sx={{ padding: '24px 4px 4px 4px', position: 'relative' }}>
        <CardReport avatarImage={ImagePagoEfectivo}>
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
              {cip}
              <IconButton aria-label="delete" size="small" sx={{ p: 0, ml: 1 }} onClick={copyText}>
                <CopyIcons sx={{ color: 'primary.main' }} />
              </IconButton>
            </Typography>
          </Box>
          <Divider orientation="vertical" variant="primary" flexItem sx={{ mx: 1 }} />
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
        </CardReport>
      </Box>
      {children}

      {download && (
        <Button variant="secondary" onClick={handleDownLoad} sx={{ mb: 4 }}>
          {label}
        </Button>
      )}

      {share && (
        <Button variant="secondary" onClick={handleShare} sx={{ mb: 4 }}>
          {label}
        </Button>
      )}
    </>
  );
}
