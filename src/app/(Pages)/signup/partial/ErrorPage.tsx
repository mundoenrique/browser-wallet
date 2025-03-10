'use client';

import Image from 'next/image';
import { Box, Button, Stack, Typography } from '@mui/material';
//Internal app
import { WhatsappIcon } from '%/Icons';
import { Linking, PurpleLayout } from '@/components';
import { fuchsiaBlue } from '@/theme/theme-default';
import { useHeadersStore } from '@/store';

export default function ErrorPage() {
  const { backLink } = useHeadersStore();

  const handleWhatsapp = () => {
    window.open('https://api.whatsapp.com/send?phone=51997535474', '_blank', 'noopener');
  };

  return (
    <PurpleLayout hidePelca bigModal>
      <Box sx={{ width: { xs: 'auto', sm: 542 }, display: 'grid', justifyItems: 'center', textAlign: 'center', mx: 3 }}>
        <Box mb={11 / 2}>
          <Image src={`/images/arts/pet-oops.png`} height={170} width={195} alt="Error" priority />
        </Box>
        <Stack spacing={3 / 2} mb={4} textAlign="center">
          <Typography variant="subtitle1" color={fuchsiaBlue[50]}>
            ¡Opps!
          </Typography>

          <Typography variant="body2" color={fuchsiaBlue[50]}>
            Parece que algo salió mal al procesar tu solicitud. Por favor contáctanos si persiste el problema.
          </Typography>
        </Stack>
        <Linking href={backLink} label="Volver a intentar" color="white" underline />
        <Button
          variant="secondary"
          onClick={handleWhatsapp}
          sx={{ width: { xs: 'auto', sm: 320 }, mb: { xs: 3, sm: 0 }, mx: { sm: 'auto' } }}
        >
          <WhatsappIcon color="primary" sx={{ p: '3px' }} />
          Contáctanos
        </Button>
      </Box>
    </PurpleLayout>
  );
}
