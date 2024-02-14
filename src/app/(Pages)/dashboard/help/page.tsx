'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Email from '@mui/icons-material/EmailOutlined';
import { Box, Stack, Typography } from '@mui/material';
import Questions from '@mui/icons-material/HelpOutlineOutlined';
//Internal app
import { HandleCard } from '@/components';
import { useNavTitleStore } from '@/store';
import { CallIcon, WhatsappIcon } from '%/Icons';

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
        sx={{ color: 'primary.main', mb: 6, display: { xs: 'none ', md: 'block' }, textAlign: 'center' }}
      >
        Ayuda
      </Typography>

      <Typography variant="body2" mb={2}>
        ¿Necesitas contactarnos?
      </Typography>
      <Stack spacing={2}>
        <HandleCard avatar={<Questions color="primary" sx={{ p: '2px' }} />} onClick={handleQuestions}>
          <Typography variant="subtitle2">Preguntas frecuentes</Typography>
          <Typography variant="body2">Inquietudes y asesorías </Typography>
        </HandleCard>

        <HandleCard avatar={<WhatsappIcon color="primary" sx={{ p: '3px' }} />}>
          <Typography variant="subtitle2">Contáctanos por WhatsApp</Typography>
          <Typography variant="body2">Atención personalizada</Typography>
        </HandleCard>

        <HandleCard avatar={<CallIcon color="primary" sx={{ p: '4px' }} />}>
          <Typography variant="subtitle2">Centro de ayuda</Typography>
          <Typography variant="body2">Lima o extranjero (511) 707 6080 y Provincia 0800 80700</Typography>
        </HandleCard>

        <HandleCard avatar={<Email color="primary" sx={{ p: '2px' }} />}>
          <Typography variant="subtitle2">Soporte</Typography>
          <Typography variant="body2">support@belcorp.com</Typography>
        </HandleCard>
      </Stack>
    </Box>
  );
}
