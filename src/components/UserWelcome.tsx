'use client';

import { useEffect, useState } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
//Internal app
import { fuchsiaBlue } from '@/theme/theme-default';
import { useApi } from '@/hooks/useApi';

/**
 * Module used to welcome the user.
 */
export default function UserWelcome(): JSX.Element {
  const [userInfo, setUserInfo] = useState<any>(null);
  const api = useApi();
  const user = 'Andrea';
  const currentUser = user[0];

  useEffect(() => {
    if (!userInfo) {
      (async () => {
        try {
          /**
           * Obteniendo UserInfo
           */
          const response = await api.get('/user/info');
          const data = response.data.data as string;
          setUserInfo(data);
        } catch (error) {
          console.error('Error generating JWT token:', error);
        }
      })();
    }
  }, [api, userInfo]);

  return (
    <Box sx={{ display: 'flex', mb: { xs: 2, md: 0 }, mt: { md: 5 } }}>
      <Avatar sx={{ width: 32, height: 32, bgcolor: fuchsiaBlue[400], mr: 3 / 2 }}>{currentUser}</Avatar>
      <Box>
        <Typography variant="h6">¡Hola {userInfo ? userInfo.name : user}! 👋</Typography>
        <Typography variant="caption">Bienvenido a yiro</Typography>
      </Box>
    </Box>
  );
}
