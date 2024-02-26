'use client';

import html2canvas from 'html2canvas';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Copy from '@mui/icons-material/ContentCopy';
import Circle from '@mui/icons-material/Brightness1';
import {
  Box,
  Button,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Stack,
} from '@mui/material';
//Internal app
import Qr from '%/images/arts/QR.png';
import { fuchsiaBlue } from '@/theme/theme-default';
import PagoEfectivo from '%/images/suppliers/pagoEfectivo.png';
import { CardReport, ContainerLayout, Linking, ModalResponsive, PurpleLayout } from '@/components';

export default function ResponseCode() {
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);
  const componentRef = useRef<any>(null);
  const ImagePagoEfectivo = {
    src: PagoEfectivo,
    alt: 'Logo Pago Efectivo',
  };

  const handleShowInfo = () => {
    setShowModal(true);
  };

  const HandleNavbar = () => {
    router.push('/dashboard/recharge');
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
    <>
      <PurpleLayout hidePelca bigModal left navbar HandleNavbar={HandleNavbar}>
        <ContainerLayout>
          <Typography
            variant="h6"
            sx={{ display: { xs: 'none', md: 'block' }, color: 'white', mb: 4, textAlign: 'center' }}
          >
            Generar recarga
          </Typography>

          <Typography color="white" mb={4} fontSize={14}>
            Recarga a través de Pago Efectivo por una de estas 2 opciones:
          </Typography>
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
            </CardReport>
          </Box>

          <Button variant="underline" sx={{ mb: 4 }} onClick={handleShowInfo}>
            ¿Cómo realizar la recarga?
          </Button>
          <Button variant="secondary" onClick={handleConvert} sx={{ mb: 4 }}>
            Guardar Código QR
          </Button>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Linking
              href="/dashboard/recharge"
              label="Volver al inicio"
              hidenArrow
              color="white"
              underline
              fontSize={16}
            />
          </Box>
        </ContainerLayout>
      </PurpleLayout>

      <ModalResponsive open={showModal} handleClose={() => setShowModal(false)}>
        <Typography variant="subtitle1" mb={2}>
          💸 ¿Cómo realizar la recarga?
        </Typography>
        <Stack direction="column" spacing={2}>
          <Box>
            <Typography variant="subtitle2" textAlign="left">
              Por Yape, Plin u otra billetera digital:
            </Typography>
            <ListItem disablePadding alignItems="flex-start">
              <ListItemIcon sx={{ minWidth: 32 }}>
                <Circle sx={{ fontSize: 8, mx: 1, my: 1 / 2 }} />
              </ListItemIcon>
              <ListItemText
                sx={{ '&>span': { fontSize: 14 } }}
                primary="Guarda la imagen del código QR en tu galería."
              />
            </ListItem>
            <ListItem disablePadding alignItems="flex-start">
              <ListItemIcon sx={{ minWidth: 32 }}>
                <Circle sx={{ fontSize: 8, mx: 1, my: 1 / 2 }} />
              </ListItemIcon>
              <ListItemText
                sx={{ '&>span': { fontSize: 14 } }}
                primary="Abre tu Yape, Plin u otra billetera y sube la imagen del código QR y recarga tu Yiro."
              />
            </ListItem>
          </Box>

          <Box>
            <Typography variant="subtitle2" textAlign="left">
              Por banca en línea:
            </Typography>
            <ListItem disablePadding alignItems="flex-start">
              <ListItemIcon sx={{ minWidth: 32 }}>
                <Circle sx={{ fontSize: 8, mx: 1, my: 1 / 2 }} />
              </ListItemIcon>
              <ListItemText
                sx={{ '&>span': { fontSize: 14 } }}
                primary="Abre tu banca en línea; en la opción “Pago de servicio” busca “PagoEfectivo” y luego “PagoEfectivo Soles”."
              />
            </ListItem>
            <ListItem disablePadding alignItems="flex-start">
              <ListItemIcon sx={{ minWidth: 32 }}>
                <Circle sx={{ fontSize: 8, mx: 1, my: 1 / 2 }} />
              </ListItemIcon>
              <ListItemText
                sx={{ '&>span': { fontSize: 14 } }}
                primary="Ingresar el Código CIP para realizar la recarga."
              />
            </ListItem>
          </Box>

          <Box>
            <Typography variant="subtitle2" textAlign="left">
              Por agente, bodegas ó banco:
            </Typography>
            <ListItem disablePadding alignItems="flex-start">
              <ListItemIcon sx={{ minWidth: 32 }}>
                <Circle sx={{ fontSize: 8, mx: 1, my: 1 / 2 }} />
              </ListItemIcon>
              <ListItemText
                sx={{ '&>span': { fontSize: 14 } }}
                primary="Menciona que realizarás un pago a la empresa “PagoEfectivo” y el Código CIP para realizar la recarga."
              />
            </ListItem>
          </Box>
        </Stack>
      </ModalResponsive>
    </>
  );
}
