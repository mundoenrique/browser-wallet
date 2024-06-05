'use client';

import 'dayjs/locale/es';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import updateLocale from 'dayjs/plugin/updateLocale';
import Dollar from '@mui/icons-material/AttachMoney';
import Clock from '@mui/icons-material/QueryBuilder';
import { Avatar, Box, Card, Divider, Stack, Typography } from '@mui/material';
//Internal app
import { useDebStore } from '@/store';
import { EsikaIsotipo } from '%/Icons';
import { fuchsiaBlue } from '@/theme/theme-default';
import { CardTicket, ContainerLayout, Linking, PurpleLayout } from '@/components';

dayjs.extend(utc);
dayjs.locale('es');
dayjs.extend(updateLocale);
dayjs.updateLocale('es', {
  monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
});

const formatDate = (dateString: string) => {
  return dayjs.utc(dateString).local().format('dddd DD MMM - h:mm a');
};

export default function Success() {
  const payOffDebt = useDebStore((state) => state.payOffDebt);

  const description = [
    {
      icon: <EsikaIsotipo sx={{ color: 'primary.main' }} />,
      label: 'Pagado a',
      description: 'Belcorp ésika',
    },
    {
      icon: <Dollar sx={{ color: 'primary.main' }} />,
      label: 'Por valor',
      description: `S/ ${payOffDebt?.amount}`,
    },
    {
      icon: <Clock sx={{ color: 'primary.main' }} />,
      label: 'Fecha y hora',
      description: payOffDebt?.transactionDate ? formatDate(payOffDebt?.transactionDate) : '-',
    },
  ];

  return (
    <PurpleLayout hidePelca bigModal left confetti>
      <ContainerLayout>
        <Typography
          variant="h6"
          sx={{ display: 'block', color: 'white', mb: 4, mt: { xs: 4, md: 0 }, textAlign: 'center' }}
        >
          Comprobante
        </Typography>

        <CardTicket textBotton="Guardar" download>
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
              {payOffDebt?.transactionIdentifier}
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

        <Box sx={{ width: '100%', display: { xs: 'flex', md: 'none' }, justifyContent: 'center' }}>
          <Linking href="/dashboard" label="Volver al inicio" hidenArrow color="white" underline fontSize={16} />
        </Box>
      </ContainerLayout>
    </PurpleLayout>
  );
}
