'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import Arrow from '@mui/icons-material/ArrowBackIos';
import { Box, Link as LinkMui, Stack, Typography } from '@mui/material';
//Internal app
import { Accordions } from '@/components';
import { useNavTitleStore } from '@/store';

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
  const { updateTitle }: any = useNavTitleStore();

  useEffect(() => {
    updateTitle('Preguntas frecuentes');
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: { xs: 'flex-start', md: 'center' },
        width: 320,
        minHeight: '100vh',
        mx: { xs: 'auto', md: 3 },
      }}
    >
      <Typography
        variant="h6"
        color="primary"
        sx={{ color: 'primary.main', mb: 6, display: { xs: 'none ', md: 'block' }, textAlign: 'center' }}
      >
        Preguntas frecuentes
      </Typography>

      <LinkMui
        component={Link}
        href="/dashboard/help"
        underline="none"
        sx={{ display: 'flex', alignItems: 'center', mb: 4 }}
        fontWeight={700}
        fontSize="12px"
      >
        <Arrow sx={{ mr: 2, width: 14, height: 14 }} />
        Volver
      </LinkMui>

      <Typography variant="body2" mb={2}>
        Selecciona el tema que necesitas
      </Typography>

      <Stack spacing={3}>
        {questions.map((item, i) => (
          <Accordions key={i} title={item.title} content={item.content} />
        ))}
      </Stack>
    </Box>
  );
}
