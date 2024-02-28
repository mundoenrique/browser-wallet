'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography } from '@mui/material';
//Internal app
import { useMenuStore } from '@/store';
import { CardDebt, LastMovements, Linking, UserWelcome } from '@/components';
import CardInformation from '@/components/cards/cardInformation/CardInformation';

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
];

export default function Dashboard() {
  const { push } = useRouter();
  const { setCurrentItem } = useMenuStore();

  useEffect(() => {
    setCurrentItem('home');
  }, [setCurrentItem]);

  return (
    <Box
      sx={{
        background: { md: 'linear-gradient(35deg, rgba(146,218,142,0) 45%, rgba(172,255,167,0.6) 100%)' },
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ width: 320, mx: { xs: 'auto', md: 3 } }}>
        <UserWelcome />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: 'calc(100vh - 92px)',
            justifyContent: { xs: 'flex-start', md: 'center' },
          }}
        >
          <CardInformation />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, mb: 2 }}>
            <CardDebt onClick={() => push('/dashboard/debt')} />
            <CardDebt OweMe />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle1">Últimos movimientos</Typography>
            <Linking href="/dashboard/movements" color="primary.main" label="Ver todo" mb={0} hidenArrow underline />
          </Box>
          <LastMovements data={movementData} />
        </Box>
      </Box>
    </Box>
  );
}
