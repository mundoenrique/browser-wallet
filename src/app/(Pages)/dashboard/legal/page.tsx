'use client';

import { useEffect } from 'react';
import { Stack, Typography } from '@mui/material';
//Internal app
import { useNavTitleStore, useMenuStore } from '@/store';
import { ContainerLayout } from '@/components';

export default function Legal() {
  const { updateTitle } = useNavTitleStore();
  const { setCurrentItem } = useMenuStore();

  useEffect(() => {
    updateTitle('Términos y condiciones');
    setCurrentItem('terms');
  }, [updateTitle, setCurrentItem]);

  return (
    <ContainerLayout fullWidth>
      <Typography
        variant="h6"
        color="primary"
        sx={{ color: 'primary.main', mb: 6, display: { xs: 'none ', md: 'block' }, width: 320, textAlign: 'center' }}
      >
        Términos y condiciones
      </Typography>

      <Stack spacing={2}>
        <Typography variant="subtitle1">Términos y condiciones</Typography>
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </Typography>

        <Typography variant="subtitle1">Lorem ipsum dolor sit amet</Typography>
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </Typography>

        <Typography variant="subtitle1">Lorem ipsum dolor sit amet</Typography>
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </Typography>
      </Stack>
    </ContainerLayout>
  );
}
