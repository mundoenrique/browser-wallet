'use client';

import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
//Internal app
import { InputSelect, LastMovements, Linking } from '@/components';
import { useNavTitleStore } from '@/store';
import { fuchsiaBlue, slate } from '@/theme/theme-default';

const movementData = [
  {
    date: '2023-10-29T05:44:36Z',
    title: 'Ingaborg Yatman',
    amount: 984,
    incoming: false,
  },
  {
    date: '2024-02-07T04:43:42Z',
    title: 'Clem Longbottom',
    amount: 889,
    incoming: true,
  },
  {
    date: '2023-05-23T14:48:24Z',
    title: 'Nani Fullagar',
    amount: 355,
    incoming: false,
  },
  {
    date: '2023-06-21T18:54:46Z',
    title: 'Pyotr Aizikov',
    amount: 361,
    incoming: true,
  },
  {
    date: '2023-08-13T11:19:41Z',
    title: 'Mab Bing',
    amount: 402,
    incoming: false,
  },
  {
    date: '2024-02-07T04:43:42Z',
    title: 'Clem Longbottom',
    amount: 889,
    incoming: true,
  },
  {
    date: '2023-05-23T14:48:24Z',
    title: 'Nani Fullagar',
    amount: 355,
    incoming: false,
  },
];

export default function Movements() {
  const { updateTitle } = useNavTitleStore();
  useEffect(() => {
    updateTitle('Movimientos');
  }, []);
  return (
    <Box
      sx={{
        minHeight: { xs: 'calc(100vh - 120px)', md: '1000px' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: { xs: 'start', md: 'center' },
        width: 360,
        mx: { xs: 'auto', md: 0 },
      }}
    >
      <Box>
        <Box sx={{ paddingX: 3 }}>
          <Typography
            variant="h6"
            align="center"
            color={fuchsiaBlue[800]}
            sx={{ mb: '40px', display: { xs: 'none', md: 'block' } }}
          >
            Movimientos
          </Typography>

          <Linking
            href="/dashboard"
            label="Volver"
            mb={'20px'}
            color={fuchsiaBlue[800]}
            iconSize={{ height: 20, width: 20 }}
          />
          <InputSelect
            name="Historial"
            options={[
              { text: 'Enero', value: '1' },
              { text: 'Febrero', value: '2' },
            ]}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            background: { xs: 'white', md: 'none' },

            borderRadius: { xs: '12px ', md: '0' },
          }}
        >
          <Box
            sx={{
              paddingX: 3,
              paddingY: '4px',
              background: slate[200],
              borderRadius: { xs: '12px 12px 0 0', md: '0' },
            }}
          >
            <Typography component="p" variant="subtitle3" color={slate[700]}>
              Diciembre 2023
            </Typography>
          </Box>

          <Box sx={{ paddingX: 3 }}>
            <LastMovements data={movementData} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
