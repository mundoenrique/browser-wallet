'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Arrow from '@mui/icons-material/ArrowForwardIos';
import { Box, Stack, Typography, useTheme, useMediaQuery } from '@mui/material';
//Internal app
import { api } from '@/utils/api';
import { HandleCard, InputSwitch, UserWelcome } from '@/components';
import { useNavTitleStore, useMenuStore, useConfigCardStore } from '@/store';
import { CardCloseIcon, CardIcons, KeyIcons, PersonWrongIcon } from '%/Icons';
import CardInformation from '@/components/cards/cardInformation/CardInformation';

export default function CardConfiguration() {
  const setCurrentItem = useMenuStore((state) => state.setCurrentItem);

  const updateTitle = useNavTitleStore((state) => state.updateTitle);

  const updatePage = useConfigCardStore((state) => state.updatePage);

  const isCardBlocked = useConfigCardStore((state) => state.isCardBlocked);

  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.up('sm'));

  useEffect(() => {
    updateTitle('Cambiar contraseña');
    setCurrentItem('card-settings');
  }, [updateTitle, setCurrentItem]);

  const { control, handleSubmit } = useForm({
    defaultValues: { temporaryBlock: false },
  });

  const onSubmit = async (data: any) => {
    const payload = {
      blockType: true ? '' : '',
    };
    api.post('');
  };

  return (
    <Box sx={{ width: 320, mx: { xs: 'auto', md: 3 } }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh ',
          justifyContent: { xs: 'flex-start', md: 'center' },
        }}
      >
        {match && <UserWelcome />}
        <Typography
          variant="h6"
          color="primary"
          sx={{ color: 'primary.main', mb: 3, display: { xs: 'none ', md: 'block' }, textAlign: 'center' }}
        >
          Configuración de mi tarjeta
        </Typography>

        <CardInformation />

        <Stack spacing={3 / 2} mt={3}>
          <HandleCard
            onClick={() => {
              updatePage('activatePhysicalCard');
            }}
            avatar={<CardIcons color="primary" sx={{ p: '2px' }} />}
            icon={<Arrow />}
          >
            <Typography variant="subtitle2">Activa tu tarjeta física</Typography>
          </HandleCard>

          <HandleCard
            avatar={<CardCloseIcon color="primary" sx={{ p: '2px' }} />}
            icon={<InputSwitch onChange={() => handleSubmit(onSubmit)()} name="temporaryBlock" control={control} />}
          >
            <Typography variant="subtitle2">Bloqueo temporal</Typography>
            <Typography fontSize={10}>Estatus: Tarjeta bloqueada</Typography>
          </HandleCard>

          <HandleCard
            onClick={() => {
              updatePage('blockCard');
            }}
            avatar={<CardCloseIcon color="primary" sx={{ p: '2px' }} />}
            icon={<Arrow />}
          >
            <Typography variant="subtitle2">Bloquear por perdida o robo</Typography>
          </HandleCard>

          <HandleCard
            onClick={() => {
              updatePage('changePin');
            }}
            avatar={<KeyIcons color="primary" sx={{ p: '2px' }} />}
            icon={<Arrow />}
          >
            <Typography variant="subtitle2">Cambiar PIN</Typography>
          </HandleCard>

          <HandleCard
            onClick={() => {
              updatePage('deleteAccount');
            }}
            avatar={<PersonWrongIcon color="primary" sx={{ p: '2px' }} />}
            icon={<Arrow />}
          >
            <Typography variant="subtitle2">Eliminar cuenta Yiro</Typography>
          </HandleCard>
        </Stack>
      </Box>
    </Box>
  );
}
