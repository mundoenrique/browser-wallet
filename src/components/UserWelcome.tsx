'use client';

import { Avatar, Box, Typography } from '@mui/material';
//Internal app
import { useUserStore } from '@/store';
import { fuchsiaBlue } from '@/theme/theme-default';

/**
 * Module used to welcome the user.
 */
export default function UserWelcome(): JSX.Element {
  const { user } = useUserStore();

  return (
    <Box sx={{ display: 'flex', mb: { xs: 2, md: 0 }, mt: { md: 5 }, width: 320, mx: 'auto' }}>
      <Avatar
        sx={{
          width: 32,
          height: 32,
          bgcolor: fuchsiaBlue[400],
          fontSize: 16,
          fontWeight: 700,
          mr: 3 / 2,
        }}
      >
        {user?.firstName[0]}
      </Avatar>
      <Box>
        <Typography variant="h6">¡Hola {user?.firstName}! 👋</Typography>
        <Typography variant="caption">Bienvenido a yiro</Typography>
      </Box>
    </Box>
  );
}
