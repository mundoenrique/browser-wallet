'use client';

import { useEffect, useState } from 'react';
import { Avatar, Box, Button, Card, Stack, Typography } from '@mui/material';
//Internal app
import { useNavTitleStore } from '@/store';
import { fuchsiaBlue } from '@/theme/theme-default';
import { ContainerLayout, ModalResponsive } from '@/components';

export default function RequestPhysicalCard() {
  const { updateTitle } = useNavTitleStore();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    updateTitle('Solicitar tarjeta física');
  }, [updateTitle]);

  const handleSendCard = () => {
    setOpen(!open);
  };

  return (
    <>
      <ContainerLayout>
        <Typography
          variant="h6"
          color="primary"
          sx={{ color: 'primary.main', mb: 6, display: { xs: 'none ', md: 'block' }, textAlign: 'center' }}
        >
          Solicitar tarjeta física
        </Typography>

        <Typography variant="body2" mb={3}>
          Haz click en el botón “Solicitar tarjeta” y te la enviaremos en tu siguiente pedido.
        </Typography>
        <Typography variant="body2" mb={2}>
          El proceso es el siguiente:
        </Typography>

        <Card sx={{ boxShadow: 0, p: 1, mb: 3 }}>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex' }}>
              <Avatar sx={{ bgcolor: fuchsiaBlue[200], width: 26, height: 26, mr: 1 }}>
                <Typography color="primary" variant="caption">
                  1
                </Typography>
              </Avatar>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle2">Solicitar la tarjeta</Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex' }}>
              <Avatar sx={{ bgcolor: fuchsiaBlue[200], width: 26, height: 26, mr: 1 }}>
                <Typography color="primary" variant="caption">
                  2
                </Typography>
              </Avatar>
              <Box sx={{ display: 'grid', alignItems: 'center' }}>
                <Typography variant="subtitle2">La recibirás en tu siguiente pedido</Typography>
                <Typography variant="caption">La tarjeta te llegará dentro de tu caja de pedido.</Typography>
                <Typography variant="caption">
                  No te preocupes por temas de seguridad, pues no tendrá ningún valor hasta que la actives.
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex' }}>
              <Avatar sx={{ bgcolor: fuchsiaBlue[200], width: 26, height: 26, mr: 1 }}>
                <Typography color="primary" variant="caption">
                  3
                </Typography>
              </Avatar>
              <Box sx={{ display: 'grid', alignItems: 'center' }}>
                <Typography variant="subtitle2">Activar la tarjeta</Typography>
                <Typography variant="caption">
                  Junto a la tarjeta, te enviaremos las instrucciones para que la actives y empieces a disfrutarla.
                </Typography>
              </Box>
            </Box>
          </Stack>
        </Card>

        <Button variant="contained" onClick={handleSendCard}>
          Solicitar tarjeta
        </Button>
      </ContainerLayout>

      <ModalResponsive open={open} handleClose={() => setOpen(false)}>
        <Typography variant="subtitle1">💳 ¡Listo! Te enviaremos tu tarjeta en el siguiente pedido.</Typography>
      </ModalResponsive>
    </>
  );
}
