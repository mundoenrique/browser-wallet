'use client';

import { useEffect } from 'react';
import Circle from '@mui/icons-material/Brightness1';
import { sendGTMEvent } from '@next/third-parties/google';
import { Box, ListItem, ListItemIcon, ListItemText, Typography, Stack } from '@mui/material';
//Internal app
import { useHeadersStore } from '@/store';
import { MuiModalProps } from '@/interfaces';
import { ModalResponsive } from '@/components';

export function ModalCollect(props: MuiModalProps) {
  const { open, handleClose } = props;

  const host = useHeadersStore((state) => state.host);

  useEffect(() => {
    sendGTMEvent({
      event: 'ga4.trackEvent',
      eventName: 'view_popup',
      eventParams: {
        section: 'cobrar :: realizarOperacion :: pagoEfectivo',
        previous_section: 'cobrar :: monto',
        pop_up_type: 'Cobro',
        pop_up_title: '¿Cómo me realizarán el pago?',
        content_type: 'modal',
      },
    });
  }, [host]);

  return (
    <ModalResponsive open={open} handleClose={handleClose}>
      <Typography variant="subtitle1" mb={2}>
        💸 ¿Cómo me realizarán el pago?
      </Typography>
      <Stack direction="column" spacing={2}>
        <Box>
          <Typography variant="subtitle2" textAlign="left">
            Si te pagan por Yape, Plin u otra billetera digital:
          </Typography>
          <ListItem disablePadding alignItems="flex-start">
            <ListItemIcon sx={{ minWidth: 32 }}>
              <Circle sx={{ fontSize: 8, mx: 1, my: 1 / 2 }} />
            </ListItemIcon>
            <ListItemText
              sx={{ '&>span': { fontSize: 14 } }}
              primary="Tendrán que escanear el Código QR y obtendrán el monto a pagar."
            />
          </ListItem>
        </Box>

        <Box>
          <Typography variant="subtitle2" textAlign="left">
            Si te pagan por banca en línea:
          </Typography>
          <ListItem disablePadding alignItems="flex-start">
            <ListItemIcon sx={{ minWidth: 32 }}>
              <Circle sx={{ fontSize: 8, mx: 1, my: 1 / 2 }} />
            </ListItemIcon>
            <ListItemText
              sx={{ '&>span': { fontSize: 14 } }}
              primary="Tendrán que realizar un “Pago de servicio” y buscar “PagoEfectivo” y luego “PagoEfectivo Soles”."
            />
          </ListItem>
          <ListItem disablePadding alignItems="flex-start">
            <ListItemIcon sx={{ minWidth: 32 }}>
              <Circle sx={{ fontSize: 8, mx: 1, my: 1 / 2 }} />
            </ListItemIcon>
            <ListItemText
              sx={{ '&>span': { fontSize: 14 } }}
              primary="Ingresar el Código CIP para que les aparezca el monto a pagar."
            />
          </ListItem>
        </Box>

        <Box>
          <Typography variant="subtitle2" textAlign="left">
            Si te pagan en efectivo por agente, bodegas ó banco:
          </Typography>
          <ListItem disablePadding alignItems="flex-start">
            <ListItemIcon sx={{ minWidth: 32 }}>
              <Circle sx={{ fontSize: 8, mx: 1, my: 1 / 2 }} />
            </ListItemIcon>
            <ListItemText
              sx={{ '&>span': { fontSize: 14 } }}
              primary="Mencionar que realizarán un pago a la empresa “PagoEfectivo” y el Código CIP para que obtengan el monto a pagar."
            />
          </ListItem>
        </Box>
      </Stack>
    </ModalResponsive>
  );
}
