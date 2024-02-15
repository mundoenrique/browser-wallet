'use client';

import { Avatar, Box, Typography } from '@mui/material';
//Internal app
import { fuchsiaBlue } from '@/theme/theme-default';

export default function UserWelcome() {
  const user = 'Andrea';
  const currentUser = user[0];

  return (
    <Box sx={{ display: 'flex', mb: { xs: 2, md: 0 }, mt: { md: 5 } }}>
      <Avatar sx={{ width: 32, height: 32, bgcolor: fuchsiaBlue[400], mr: 3 / 2 }}>{currentUser}</Avatar>
      <Box>
        <Typography variant="h6">¡Hola {user}! 👋</Typography>
        <Typography variant="caption">Bienvenido a yiro</Typography>
      </Box>
    </Box>
  );
}
