'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Stack, Typography } from '@mui/material';
import Arrow from '@mui/icons-material/ArrowForwardIos';
//Internal app
import { useNavTitleStore, useMenuStore } from '@/store';
import { CardInformation, HandleCard, InputSwitch, UserWelcome } from '@/components';
import { CardCloseIcon, CardIcons, KeyIcons, PersonWrongIcon, WebPageIcon } from '%/Icons';

export default function CardConfiguration() {
  const { setCurrentItem } = useMenuStore();
  const { updateTitle } = useNavTitleStore();

  useEffect(() => {
    updateTitle('Cambiar contraseña');
    setCurrentItem('card-settings');
  }, [updateTitle, setCurrentItem]);

  const { control } = useForm({
    defaultValues: { shopping: '' },
  });

  return (
    <Box sx={{ width: 320, mx: { xs: 'auto', md: 3 } }}>
      <UserWelcome />
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

          <HandleCard
            avatar={<CardCloseIcon color="primary" sx={{ p: '2px' }} />}
            icon={<InputSwitch name="temporaryLock" control={control} />}
          >
            <Typography variant="subtitle2">Bloqueo temporal</Typography>
            <Typography fontSize={10}>Estatus: Tarjeta bloqueada</Typography>
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
