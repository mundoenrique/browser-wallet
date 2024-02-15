'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Arrow from '@mui/icons-material/ArrowForwardIos';
import { Avatar, Box, Stack, Typography } from '@mui/material';
//Internal app
import { useNavTitleStore } from '@/store';
import { fuchsiaBlue } from '@/theme/theme-default';
import { CardInformation, HandleCard, InputSwitch } from '@/components';
import { CardCloseIcon, CardIcons, KeyIcons, PersonWrongIcon, WebPageIcon } from '%/Icons';

export default function CardConfiguration() {
  const { updateTitle }: any = useNavTitleStore();
  const user = 'Andrea';
  const currentUser = user[0];

  useEffect(() => {
    updateTitle('Cambiar contraseña');
  }, []);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      shopping: '',
    },
  });

  return (
    <Box sx={{ width: 320, mx: { xs: 'auto', md: 3 } }}>
      <Box sx={{ display: 'flex', mb: { xs: 2, md: 0 }, mt: { md: 5 } }}>
        <Avatar sx={{ width: '32px', height: '32px', bgcolor: fuchsiaBlue[400], mr: '12px' }}>{currentUser}</Avatar>
        <Box>
          <Typography variant="h6">¡Hola {user}! 👋</Typography>
          <Typography variant="caption">Bienvenido a yiro</Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: 'calc(100vh - 92px)',
          justifyContent: { xs: 'flex-start', md: 'center' },
        }}
      >
        <Typography
          variant="h6"
          color="primary"
          sx={{ color: 'primary.main', mb: 3, display: { xs: 'none ', md: 'block' }, textAlign: 'center' }}
        >
          Configuración de mi tarjeta
        </Typography>

        <CardInformation />

        <Stack spacing={3 / 2} mt={3}>
          <HandleCard avatar={<CardIcons color="primary" sx={{ p: '2px' }} />} icon={<Arrow />}>
            <Typography variant="subtitle2">Activa tu tarjeta física</Typography>
          </HandleCard>

          <HandleCard
            avatar={<WebPageIcon color="primary" sx={{ p: '3px' }} />}
            icon={<InputSwitch name="shopping" control={control} />}
          >
            <Typography variant="subtitle2">Compras por internet</Typography>
            <Typography fontSize={10}>Estatus: Activada</Typography>
          </HandleCard>

          <HandleCard avatar={<CardCloseIcon color="primary" sx={{ p: '2px' }} />} icon={<Arrow />}>
            <Typography variant="subtitle2">Bloquear por perdida o robo</Typography>
          </HandleCard>

          <HandleCard avatar={<KeyIcons color="primary" sx={{ p: '2px' }} />} icon={<Arrow />}>
            <Typography variant="subtitle2">Cambiar PIN</Typography>
          </HandleCard>

          <HandleCard avatar={<PersonWrongIcon color="primary" sx={{ p: '2px' }} />} icon={<Arrow />}>
            <Typography variant="subtitle2">Eliminar cuenta Yiro</Typography>
          </HandleCard>
        </Stack>
      </Box>
    </Box>
  );
}
