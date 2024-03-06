'use client';

import { useEffect } from 'react';
import { Stack, Typography } from '@mui/material';
//Internal app
import { useNavTitleStore, useMenuStore } from '@/store';
import { Accordions, ContainerLayout, Linking } from '@/components';

const questions = [
  {
    title: 'Question 1',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    title: 'Question 2',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
];

export default function Questions() {
  const { updateTitle } = useNavTitleStore();
  const { setCurrentItem } = useMenuStore();

  useEffect(() => {
    updateTitle('Preguntas frecuentes');
    setCurrentItem('help');
  }, [updateTitle, setCurrentItem]);

  return (
    <ContainerLayout>
      <Typography
        variant="h6"
        color="primary"
        sx={{ color: 'primary.main', mb: 6, display: { xs: 'none ', md: 'block' }, textAlign: 'center' }}
      >
        Preguntas frecuentes
      </Typography>

      <Linking href="/dashboard/help" label="Volver" />

      <Typography variant="body2" mb={2}>
        Selecciona el tema que necesitas
      </Typography>

      <Stack spacing={2}>
        {questions.map((item, i) => (
          <Accordions key={i} title={item.title} content={item.content} />
        ))}
      </Stack>
    </ContainerLayout>
  );
}
