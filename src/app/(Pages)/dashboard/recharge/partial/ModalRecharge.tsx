'use client';

import { useEffect } from 'react';
import Circle from '@mui/icons-material/Brightness1';
import { sendGTMEvent } from '@next/third-parties/google';
import { Box, ListItem, ListItemIcon, ListItemText, Typography, Stack } from '@mui/material';
//Internal app
import { MuiModalProps } from '@/interfaces';
import { ModalResponsive } from '@/components';

export function ModalRecharge(props: Readonly<MuiModalProps>) {
  const { open, handleClose } = props;

  useEffect(() => {
    if (open) {
      sendGTMEvent({
        event: 'ga4.trackEvent',
        eventName: 'page_view_ga4',
        eventParams: {
          section: 'Yiro :: recargas :: realizarOperacion :: pagoEfectivo',
          previous_section: 'Yiro :: recargas :: monto',
          pop_up_type: 'Recarga',
          pop_up_title: '¿Cómo realizar la recarga?',
          content_type: 'modal',
        },
      });
    }
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ModalResponsive open={open} handleClose={handleClose}>
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
            <ListItemText sx={{ '&>span': { fontSize: 14 } }} primary="Guarda la imagen del código QR en tu galería." />
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
  );
}
