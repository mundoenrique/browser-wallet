'use client';

import { Box, Typography } from '@mui/material';
//Internal app
import PagoEfectivo from '%/images/suppliers/pagoEfectivo.png';
import { CardDetails, ContainerLayout, PurpleLayout } from '@/components';

export default function ResponseCode() {
  const ImagePagoEfectivo = {
    src: PagoEfectivo,
    alt: 'Logo Pago Efectivo',
  };

  return (
    <PurpleLayout hidePelca bigModal left confetti>
      <ContainerLayout>
        <Typography
          variant="h6"
          sx={{ display: { xs: 'none', md: 'block' }, color: 'white', mb: 4, textAlign: 'center' }}
        >
          Comprobante
        </Typography>

        <Box sx={{ padding: '24px 4px 4px 4px', position: 'relative' }}>
          <CardDetails avatarImage={ImagePagoEfectivo}></CardDetails>
        </Box>
      </ContainerLayout>
    </PurpleLayout>
  );
}
