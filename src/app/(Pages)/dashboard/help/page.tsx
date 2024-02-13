'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Email from '@mui/icons-material/EmailOutlined';
import Questions from '@mui/icons-material/HelpOutlineOutlined';
import { Avatar, Box, Card, Stack, Typography } from '@mui/material';
//Internal app
import { CallIcon } from '%/Icons';
import { useNavTitleStore } from '@/store';
import { fuchsiaBlue } from '@/theme/theme-default';

export default function Help() {
  const router = useRouter();
  const { updateTitle }: any = useNavTitleStore();

  const handleQuestions = () => {
    router.push('/dashboard/help/frequent-questions');
  };

  useEffect(() => {
    updateTitle('Ayuda');
  }, []);

  return (
    <Box sx={{ width: 320, mx: { xs: 'auto', md: 3 }, mt: { md: 29 } }}>
      <Typography
        variant="h6"
        color="primary"
        mb={6}
        sx={{ color: 'primary.main', mb: 6, display: { xs: 'none ', md: 'block' }, textAlign: 'center' }}
      >
        Ayuda
      </Typography>

      <Typography variant="body2" mb={2}>
        ¿Necesitas contactarnos?
      </Typography>
      <Stack spacing={2}>
        <Card sx={{ boxShadow: 0, display: 'flex', p: 1 }}>
          <Avatar sx={{ bgcolor: fuchsiaBlue[200], width: 26, height: 26, mr: 1 }}>
            <CallIcon color="primary" sx={{ p: '4px' }} />
          </Avatar>
          <Box>
            <Typography variant="subtitle2">Centro de ayuda</Typography>
            <Typography variant="body2">Lima o extranjero (511) 707 6080 y Provincia 0800 80700</Typography>
          </Box>
        </Card>
        <Card sx={{ boxShadow: 0, display: 'flex', p: 1 }}>
          <Avatar sx={{ bgcolor: fuchsiaBlue[200], width: 26, height: 26, mr: 1 }}>
            <Email color="primary" sx={{ p: '2px' }} />
          </Avatar>
          <Box>
            <Typography variant="subtitle2">Soporte</Typography>
            <Typography variant="body2">support@belcorp.com</Typography>
          </Box>
        </Card>
        <Card sx={{ boxShadow: 0, display: 'flex', p: 1, cursor: 'pointer' }} onClick={handleQuestions}>
          <Avatar sx={{ bgcolor: fuchsiaBlue[200], width: 26, height: 26, mr: 1 }}>
            <Questions color="primary" sx={{ p: '2px' }} />
          </Avatar>
          <Box>
            <Typography variant="subtitle2">Preguntas frecuentes</Typography>
            <Typography variant="body2">Inquietudes y asesorías </Typography>
          </Box>
        </Card>
      </Stack>
    </Box>
  );
}
