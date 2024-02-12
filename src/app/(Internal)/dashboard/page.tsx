'use client';

import { Avatar, Box, Typography } from '@mui/material';
//Internal app
import { fuchsiaBlue } from '@/theme/theme-default';
import { CardDebt, CardInformation, LastMovements } from '@/components';

const user = 'Andrea';
const currentUser = user[0];

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
        <LastMovements />
      </Box>
    </Box>
  );
}
