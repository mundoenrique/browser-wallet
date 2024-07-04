'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { isBrowser, isMobile, isTablet } from 'react-device-detect';
import { Box, Button, Divider, IconButton, Typography } from '@mui/material';
//Internal app
import { CopyIcons } from '%/Icons';
import CardReport from './CardReport';
import Qr from '%/images/arts/default-qr.svg';
import { fuchsiaBlue } from '@/theme/theme-default';
import { CardPagoEfectivoProps } from '@/interfaces';
import PagoEfectivo from '%/images/suppliers/pagoEfectivo.png';
import { handleDownload, handleShare } from '@/utils/toolHelper';

/**
 * Card used to display the information generated by Pago Efectivo
 *
 * @param cip - CIP code
 * @param children - Add elements from the parent
 * @param label - Label of buttons
 * @param download - handling for file download
 * @param downloadGA - handle Google Analytics
 * @param share - handling for image shared
 * @param shareGA - handle Google Analytics
 * @param codeQr - Qr Code Pago Efectivo
 */
export default function CardPagoEfectivo({
  cip,
  children,
  label,
  download,
  downloadGA,
  share,
  shareGA,
  codeQr,
}: CardPagoEfectivoProps) {
  const ticketRef = useRef<any>(null);

  const ImagePagoEfectivo = {
    src: PagoEfectivo,
    width: 480,
    alt: 'Logo Pago Efectivo',
  };
  const shareData: any = {
    files: [],
    text: `¡Hola! 👋 en el siguiente link tendras los detalles para realizar la transferencia:\n\nPaga por Yape, Plin u otras billeteras escaneando el código QR que figura arriba.\n\nPaga en agentes o banca en línea por PagoEfectivo en soles con este Código CIP: 8462 1935 7079\n\n ¿Cómo pagar?\nhttps://www.pagoefectivo.la/pe/como-pagar`,
  };

  const handleShareClick = () => {
    downloadGA;
    if (isBrowser) {
      handleShare(ticketRef.current, shareData, fuchsiaBlue[800]);
    }

    if (isMobile || isTablet) {
      handleShare(ticketRef.current, shareData, 'white');
    }
  };

  const handleDownloadClick = () => {
    shareGA;
    handleDownload(ticketRef.current, 'recarga.png', fuchsiaBlue[800]);
  };

  return (
    <>
      <Box ref={ticketRef} sx={{ padding: '24px 4px 4px 4px', position: 'relative' }}>
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
            <Typography variant="subtitle1" sx={{ display: 'flex', color: 'primary.main', alignItems: 'center' }}>
              {cip}
              <CopyToClipboard text={cip}>
                <IconButton aria-label="delete" size="small" sx={{ p: 0, ml: 1 }}>
                  <CopyIcons sx={{ color: 'primary.main' }} />
                </IconButton>
              </CopyToClipboard>
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
            <Box>
              {codeQr ? (
                <Image src={codeQr} alt="Código Qr" width={106} height={106} priority />
              ) : (
                <Image src={Qr} alt="Código Qr" width={106} height={106} priority />
              )}
            </Box>
          </Box>
        </CardReport>
      </Box>
      {children}

      {download && codeQr && (
        <Button variant="secondary" onClick={handleDownloadClick} sx={{ mb: 4 }}>
          {label}
        </Button>
      )}

      {share && codeQr && (
        <Button variant="secondary" onClick={handleShareClick} sx={{ mb: 4 }}>
          {label}
        </Button>
      )}
    </>
  );
}
