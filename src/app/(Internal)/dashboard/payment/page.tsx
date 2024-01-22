'use client';

import Image from 'next/image';
import Copy from '@mui/icons-material/ContentCopy';
import { Box, Button, Divider, IconButton, Typography } from '@mui/material';
//Internal app
import Qr from '%/images/QR.png';
import { CardDetails, MainLayout } from '@/components';
import PagoEfectivo from '%/images/suppliers/pagoEfectivo.png';

export default function Payment() {
  const ImagePagoEfectivo = [
    {
      src: PagoEfectivo,
      alt: 'Logo Pago Efectivo',
    },
  ];

  return (
    <MainLayout svg={false}>
      <Box sx={{ width: 320 }}>
        <Typography variant="h6" color="white" mb={4} textAlign="center">
          Crear solicitud de cobro
        </Typography>
        <Typography color="white" mb={4}>
          Comparte esta información para que te paguen a través de Pago Efectivo:
        </Typography>
        <CardDetails avatarImage={ImagePagoEfectivo}>
          <Box
            sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center', alignItems: 'center', width: '140px' }}
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
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '140px', textAlign: 'center' }}
          >
            <Typography fontWeight={700} mb={3}>
              Yape, Plin u otras billeteras:
            </Typography>
            <Image src={Qr} width={106} height={100} alt="Código QR" />
          </Box>
        </CardDetails>
        <Box
          sx={{
            bgcolor: 'secondary.dark',
            width: '100%',
            height: '59',
            textAlign: 'center',
            py: '12px',
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
        <Button variant="secondary">Compartir</Button>
      </Box>
    </MainLayout>
  );
}
