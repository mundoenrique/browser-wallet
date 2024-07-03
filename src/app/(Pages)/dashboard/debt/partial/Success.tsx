'use client';

import { useEffect } from 'react';
import Dollar from '@mui/icons-material/AttachMoney';
import Clock from '@mui/icons-material/QueryBuilder';
import { sendGTMEvent } from '@next/third-parties/google';
import { Avatar, Box, Card, Divider, Stack, Typography } from '@mui/material';
//Internal app
import { EsikaIsotipo } from '%/Icons';
import { formatDate } from '@/utils/dates';
import { fuchsiaBlue } from '@/theme/theme-default';
import { useDebStore, useHeadersStore } from '@/store';
import { CardTicket, ContainerLayout, Linking, PurpleLayout } from '@/components';

export default function Success() {
  const host = useHeadersStore((state) => state.host);

  const setView = useDebStore((state) => state.setView);

  const payOffDebt = useDebStore((state) => state.payOffDebt);

  useEffect(() => {
    sendGTMEvent({
      event: 'ga4.trackEvent',
      eventName: 'page_view_ga4',
      eventParams: {
        page_location: `${host}/dashboard/debt`,
        page_title: 'Yiro :: pagarDeuda :: operacionExitosa',
        page_referrer: `${host}/dashboard`,
        section: 'Yiro :: pagarDeuda :: operacionExitosa',
        previous_section: 'Yiro :: pagarDeuda :: monto',
      },
    });
  }, [host]);

  const description = [
    {
      icon: <EsikaIsotipo sx={{ color: 'primary.main' }} />,
      label: 'Pagado a',
      description: 'Belcorp ésika',
    },
    {
      icon: <Dollar sx={{ color: 'primary.main' }} />,
      label: 'Por valor',
      description: `S/ ${payOffDebt?.data?.amount}`,
    },
    {
      icon: <Clock sx={{ color: 'primary.main' }} />,
      label: 'Fecha y hora',
      description: payOffDebt?.data?.transactionDate ? formatDate(payOffDebt?.data?.transactionDate) : '-',
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

        <CardTicket
          textBotton="Guardar"
          download
          downloadGA={() =>
            sendGTMEvent({
              event: 'ga4.trackEvent',
              eventName: 'select_content',
              eventParams: {
                content_type: 'boton',
                section: 'Yiro :: pagarDeuda :: operacionExitosa',
                previous_section: 'Yiro :: pagarDeuda :: monto',
                selected_content: 'Guardar',
                destination_page: `${host}/dashboard/debt`,
              },
            })
          }
        >
          <Box sx={{ display: 'grid', width: '100%' }}>
            <Typography variant="subtitle1" textAlign="center">
              Has pagado
            </Typography>
            <Typography variant="h4" color="primary" textAlign="center" fontWeight={700}>
              ¡Felicidades!
            </Typography>
            <Typography variant="caption" textAlign="center">
              Los datos de la transacción son:
            </Typography>
            <Typography variant="body1" color="primary" textAlign="center" mb={3} fontWeight={700}>
              {payOffDebt?.data?.transactionIdentifier}
            </Typography>
            <Card sx={{ boxShadow: 'none', p: 1 }}>
              <Stack direction="column" divider={<Divider orientation="horizontal" />} spacing={1}>
                {description.map((item, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ bgcolor: fuchsiaBlue[200], width: 26, height: 26, mr: 1 }}>{item.icon}</Avatar>
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

        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }} onClick={() => setView('DEBT')}>
          <Linking href="/dashboard" label="Volver al inicio" hidenArrow color="white" underline fontSize={16} />
        </Box>
      </ContainerLayout>
    </PurpleLayout>
  );
}
