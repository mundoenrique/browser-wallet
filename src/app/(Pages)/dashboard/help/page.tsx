'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Stack, Typography } from '@mui/material';
import Email from '@mui/icons-material/EmailOutlined';
import { sendGTMEvent } from '@next/third-parties/google';
import Questions from '@mui/icons-material/HelpOutlineOutlined';
//Internal app
import { CallIcon, WhatsappIcon } from '%/Icons';
import { ContainerLayout, HandleCard } from '@/components';
import { useNavTitleStore, useMenuStore, useHeadersStore } from '@/store';

export default function Help() {
  const { push } = useRouter();

  const { setCurrentItem } = useMenuStore();

  const { updateTitle } = useNavTitleStore();

  const host = useHeadersStore((state) => state.host);

  const handleQuestions = () => {
    push('/dashboard/help/frequent-questions');
  };

  const handleWhatsapp = () => {
    window.open('https://api.whatsapp.com/send?phone=51997535474', '_blank');
    sendGTMEvent({
      event: 'ga4.trackEvent',
      eventName: 'select_content',
      eventParams: {
        content_type: 'boton',
        section: 'Yiro :: ayuda',
        previous_section: 'dashboard',
        selected_content: 'Contáctanos por WhatsApp',
        destination_page: `https://api.whatsapp.com/send?phone=51997535474`,
      },
    });
  };

  useEffect(() => {
    updateTitle('Ayuda');
    setCurrentItem('help');
  }, [updateTitle, setCurrentItem]);

  useEffect(() => {
    sendGTMEvent({
      event: 'ga4.trackEvent',
      eventName: 'page_view_ga4',
      eventParams: {
        page_location: `${host}/dashboard/help`,
        page_title: 'Yiro :: ayuda',
        page_referrer: `${host}/dashboard`,
        section: 'Yiro :: ayuda',
        previous_section: 'dashboard',
      },
    });
  }, [host]);

  return (
    <ContainerLayout>
      <Box sx={{ transform: 'translate(10px, -60px)' }}>
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

          <HandleCard avatar={<WhatsappIcon color="primary" sx={{ p: '3px' }} />} onClick={handleWhatsapp}>
            <Typography variant="subtitle2">Contáctanos por WhatsApp</Typography>
            <Typography variant="body2">Atención personalizada</Typography>
          </HandleCard>

          <HandleCard avatar={<CallIcon color="primary" sx={{ p: '4px' }} />}>
            <Typography variant="subtitle2">Centro de ayuda</Typography>
            <Typography variant="body2">Lima o extranjero (511) 707 6080 y Provincia 0800 80700</Typography>
          </HandleCard>

          <HandleCard avatar={<Email color="primary" sx={{ p: '2px' }} />}>
            <Typography variant="subtitle2">Soporte</Typography>
            <Typography variant="body2">servicioalcliente@yiro.pe</Typography>
          </HandleCard>
        </Stack>
      </Box>
    </ContainerLayout>
  );
}
