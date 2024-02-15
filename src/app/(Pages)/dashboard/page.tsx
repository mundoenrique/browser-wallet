'use client';

import { Avatar, Box, Link as LinkMui, Typography } from '@mui/material';
import Link from 'next/link';
//Internal app
import { fuchsiaBlue } from '@/theme/theme-default';
import { CardDebt, CardInformation, LastMovements } from '@/components';

const user = 'Andrea';
const currentUser = user[0];

//TODO:
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
        <Box sx={{ display: 'flex', mb: { xs: 2, md: 10 }, mt: { md: 5 } }}>
          <Avatar sx={{ width: '32px', height: '32px', bgcolor: fuchsiaBlue[400], mr: '12px' }}>{currentUser}</Avatar>
          <Box>
            <Typography variant="h6">¡Hola {user}! 👋</Typography>
            <Typography variant="caption">Bienvenido a yiro</Typography>
          </Box>
        </Box>
        <CardInformation />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, mb: 2 }}>
          <CardDebt />
          <CardDebt OweMe />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="subtitle1">Últimos movimientos</Typography>
          <LinkMui component={Link} href="#" color="primary.main" fontWeight={700} fontSize={12}>
            Ver todo
          </LinkMui>
        </Box>
        <LastMovements data={movementData} />
      </Box>
    </Box>
  );
}
