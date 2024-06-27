'use client';

import Dollar from '@mui/icons-material/AttachMoney';
import Clock from '@mui/icons-material/QueryBuilder';
import { Avatar, Box, Card, Divider, Stack, Typography } from '@mui/material';
//Internal app
import { CardTicketProps } from '@/interfaces';
import { stringAvatar } from '@/utils/toolHelper';
import { fuchsiaBlue } from '@/theme/theme-default';
import { CardTicket, ContainerLayout, Linking, PurpleLayout } from '@/components';

export default function Success({ onClick, transferDetail }: CardTicketProps) {
  const description = [
    {
      icon: stringAvatar(transferDetail?.receiver ?? '').children,
      label: 'Nombre de quien recibe:',
      description: transferDetail?.receiver,
    },
    {
      icon: <Dollar sx={{ color: 'primary.main' }} />,
      label: 'Monto de la transacción',
      description: Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(
        transferDetail?.amount as number
      ),
    },
    {
      icon: <Clock sx={{ color: 'primary.main' }} />,
      label: 'Fecha y hora',
      description: transferDetail?.date,
    },
  ];

  return (
    <PurpleLayout hidePelca bigModal left confetti width="calc(100% - 315px)">
      <ContainerLayout>
        <Typography
          variant="h6"
          sx={{ display: 'block', color: 'white', mb: 4, mt: { xs: 4, md: 0 }, textAlign: 'center' }}
        >
          Comprobante
        </Typography>

        <CardTicket textBotton="Nueva transferencia" shared onClick={onClick}>
          <Box sx={{ display: 'grid', width: '100%' }}>
            <Typography variant="h5" color="primary" textAlign="center" fontWeight={700}>
              Transacción exitosa
            </Typography>
            <Typography variant="caption" textAlign="center">
              Número de la transacción:
            </Typography>
            <Typography variant="body1" color="primary" textAlign="center" mb={3} fontWeight={700}>
              {transferDetail?.transactionCode}
            </Typography>
            <Card sx={{ boxShadow: 'none', p: 1 }}>
              <Stack direction="column" divider={<Divider orientation="horizontal" />} spacing={1}>
                {description.map((item, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      sx={{
                        bgcolor: fuchsiaBlue[200],
                        width: 26,
                        height: 26,
                        mr: 1,
                        color: 'primary.main',
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    >
                      {item.icon}
                    </Avatar>
                    <Box sx={{ display: 'grid', alignItems: 'center' }}>
                      <Typography fontSize={10}>{item.label}</Typography>
                      <Typography variant="caption" fontWeight={700}>
                        {item.description}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Card>
          </Box>
        </CardTicket>

        <Box sx={{ width: '100%', display: { xs: 'flex', md: 'none' }, justifyContent: 'center' }}>
          <Linking href="/dashboard" label="Volver al inicio" hidenArrow color="white" underline fontSize={16} />
        </Box>
      </ContainerLayout>
    </PurpleLayout>
  );
}
