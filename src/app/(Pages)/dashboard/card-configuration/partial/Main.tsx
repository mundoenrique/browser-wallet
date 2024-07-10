'use client';

import { useForm } from 'react-hook-form';
import Arrow from '@mui/icons-material/ArrowForwardIos';
import { useEffect, useCallback, useState } from 'react';
import { Box, Stack, Typography, useTheme, useMediaQuery } from '@mui/material';
//Internal app
import { api } from '@/utils/api';
import { encryptForge } from '@/utils/toolHelper';
import ModalOtp from '@/components/modal/ModalOtp';
import { HandleCard, InputSwitch, UserWelcome } from '@/components';
import { CardCloseIcon, CardIcons, KeyIcons, PersonWrongIcon } from '%/Icons';
import CardInformation from '@/components/cards/cardInformation/CardInformation';
import { useNavTitleStore, useMenuStore, useConfigCardStore, useUserStore, useUiStore, useOtpStore } from '@/store';

export default function CardConfiguration() {
  const theme = useTheme();

  const match = useMediaQuery(theme.breakpoints.up('sm'));

  const otpUuid = useOtpStore((state) => state.otpUuid);

  const { userId } = useUserStore((state) => state.user);

  const cardInfo = useConfigCardStore((state) => state.cardInfo);

  const blockType = useConfigCardStore((state) => state.blockType);

  const setModalError = useUiStore((state) => state.setModalError);

  const updateTitle = useNavTitleStore((state) => state.updateTitle);

  const getUserCardId = useUserStore((state) => state.getUserCardId);

  const updatePage = useConfigCardStore((state) => state.updatePage);

  const setCurrentItem = useMenuStore((state) => state.setCurrentItem);

  const toggleUpdate = useConfigCardStore((state) => state.toggleUpdate);

  const setLoadingScreen = useUiStore((state) => state.setLoadingScreen);

  const isCardBlocked = useConfigCardStore((state) => state.isCardBlocked);

  const isCardVirtual = useConfigCardStore((state) => state.isCardVirtual);

  const isUserCardVirtual = useUserStore((state) => state.isUserCardVirtual);

  const [openOtp, setOpenOtp] = useState<boolean>(false);

  useEffect(() => {
    updateTitle('Cambiar contraseña');
    setCurrentItem('card-settings');
  }, [updateTitle, setCurrentItem]);

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: { temporaryBlock: isCardBlocked() },
  });

  const onSubmitOtp = useCallback(
    async (data: any) => {
      setLoadingScreen(true);
      const { otp } = data;

      const payload = {
        otpProcessCode: 'LOCK_AND_UNLOCK_CARD_OTP',
        otpUuId: otpUuid,
        otpCode: encryptForge(otp),
      };

      api
        .post(`/users/${userId}/validate/tfa`, payload)
        .then((response) => {
          if (response.data.code === '200.00.000') {
            setOpenOtp(false);
            handleSubmit(onSubmit)();
          }
        })
        .catch((e) => {
          setModalError({ error: e });
          setLoadingScreen(false);
        });
    },
    [otpUuid] //eslint-disable-line
  );

  useEffect(() => {
    setValue('temporaryBlock', Object.hasOwn(blockType, 'code'));
  }, [blockType, setValue]);

  const onSubmit = async (data: any) => {
    const payload = data.temporaryBlock
      ? { blockType: '00', observations: 'Unblock card' }
      : { blockType: 'PB', observations: 'Preventive block' };

    api
      .post(`/cards/${getUserCardId()}/block`, payload)
      .then(() => {
        toggleUpdate();
      })
      .catch((e) => {
        setModalError({ error: e });
      })
      .finally(() => {
        setLoadingScreen(false);
      });
  };

  const virtualCard = isCardVirtual();

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
          {isUserCardVirtual() && (
            <HandleCard
              onClick={() => {
                updatePage('activatePhysicalCard');
              }}
              avatar={<CardIcons color="primary" sx={{ p: '2px' }} />}
              icon={<Arrow />}
            >
              <Typography variant="subtitle2">Activa tu tarjeta física</Typography>
            </HandleCard>
          )}
          <HandleCard
            avatar={<CardCloseIcon color="primary" sx={{ p: '2px' }} />}
            icon={
              <InputSwitch
                name="temporaryBlock"
                control={control}
                switchProps={{
                  onClick: (e) => {
                    if (cardInfo) {
                      e.preventDefault();
                      setOpenOtp(true);
                    }
                  },
                  disabled: !cardInfo,
                }}
              />
            }
            disabled={!cardInfo}
          >
            <Typography variant="subtitle2">Bloqueo temporal</Typography>
            <Typography fontSize={10}>
              Estatus: Tarjeta {Object.hasOwn(blockType, 'code') ? 'bloqueada' : 'desbloqueada'}
            </Typography>
          </HandleCard>

          {!virtualCard && (
            <HandleCard
              onClick={() => {
                updatePage('blockCard');
              }}
              avatar={<CardCloseIcon color="primary" sx={{ p: '2px' }} />}
              icon={<Arrow />}
            >
              <Typography variant="subtitle2">Bloquear por perdida o robo</Typography>
            </HandleCard>
          )}

          {!virtualCard && (
            <HandleCard
              onClick={() => {
                updatePage('changePin');
              }}
              avatar={<KeyIcons color="primary" sx={{ p: '2px' }} />}
              icon={<Arrow />}
            >
              <Typography variant="subtitle2">Cambiar PIN</Typography>
            </HandleCard>
          )}

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
      {openOtp && (
        <ModalOtp
          open={openOtp}
          handleClose={() => setOpenOtp(false)}
          onSubmit={onSubmitOtp}
          processCode="LOCK_AND_UNLOCK_CARD_OTP"
        />
      )}
    </Box>
  );
}
