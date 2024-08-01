'use client';

import { useForm } from 'react-hook-form';
import Arrow from '@mui/icons-material/ArrowForwardIos';
import { useEffect, useCallback, useState } from 'react';
import { sendGTMEvent } from '@next/third-parties/google';
import { Box, Stack, Typography, useTheme, useMediaQuery } from '@mui/material';
//Internal app
import { api } from '@/utils/api';
import { encryptForge } from '@/utils/toolHelper';
import ModalOtp from '@/components/modal/ModalOtp';
import { HandleCard, InputSwitch, UserWelcome } from '@/components';
import { CardCloseIcon, CardIcons, KeyIcons, PersonWrongIcon } from '%/Icons';
import CardInformation from '@/components/cards/cardInformation/CardInformation';
import {
  useNavTitleStore,
  useMenuStore,
  useConfigCardStore,
  useUserStore,
  useUiStore,
  useOtpStore,
  useHeadersStore,
} from '@/store';

export default function CardConfiguration() {
  const theme = useTheme();

  const match = useMediaQuery(theme.breakpoints.up('sm'));

  const host = useHeadersStore((state) => state.host);

  const otpUuid = useOtpStore((state) => state.otpUuid);

  const { userId } = useUserStore((state) => state.user);

  const isPhysicalCard = useConfigCardStore((state) => state.isPhysicalCard);

  const isTempBlock = useConfigCardStore((state) => state.isTempBlock);

  const cardActivationStatus = useConfigCardStore((state) => state.cardActivationStatus);

  const cardInformation = useConfigCardStore((state) => state.cardInformation);

  const setCardProperties = useConfigCardStore((state) => state.setCardProperties);

  const setModalError = useUiStore((state) => state.setModalError);

  const updateTitle = useNavTitleStore((state) => state.updateTitle);

  const getUserCardId = useUserStore((state) => state.getUserCardId);

  const updatePage = useConfigCardStore((state) => state.updatePage);

  const setCurrentItem = useMenuStore((state) => state.setCurrentItem);

  const setLoadingScreen = useUiStore((state) => state.setLoadingScreen);

  const isCardBlocked = useConfigCardStore((state) => state.isCardBlocked);

  const [openOtp, setOpenOtp] = useState<boolean>(false);

  useEffect(() => {
    updateTitle('Cambiar contraseña');
    setCurrentItem('card-settings');
  }, [updateTitle, setCurrentItem]);

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: { temporaryBlock: isCardBlocked() },
  });

  const getCardInformation = async () => {
    await api.get(`/cards/${getUserCardId()}`, { params: { decryptData: false } }).then((response: any) => {
      const { data } = response;
      setCardProperties('cardInformation', data.data);
    });
  };

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
    setValue('temporaryBlock', isTempBlock());
  }, [isTempBlock, setValue, cardInformation]);

  const onSubmit = async (data: any) => {
    const payload = data.temporaryBlock
      ? { blockType: '00', observations: 'Unblock card' }
      : { blockType: 'PB', observations: 'Preventive block' };

    api
      .post(`/cards/${getUserCardId()}/block`, payload)
      .then(async () => {
        await getCardInformation();
      })
      .catch((e) => {
        setModalError({ error: e });
      })
      .finally(() => {
        setLoadingScreen(false);
      });
  };

  useEffect(() => {
    sendGTMEvent({
      event: 'ga4.trackEvent',
      eventName: 'page_view_ga4',
      eventParams: {
        page_location: `${host}/dashboard/card-configuration/menu`,
        page_title: 'Yiro :: configuracionTarjeta :: menu',
        page_referrer: `${host}/dashboard`,
        section: 'Yiro :: configuracionTarjeta :: menu',
        previous_section: 'dashboard',
      },
    });
  }, [host]);

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
          {!isPhysicalCard() && (
            <>
              {cardActivationStatus() === 'PENDING' ? (
                <HandleCard
                  onClick={() => {
                    updatePage('activatePhysicalCard');
                    sendGTMEvent({
                      event: 'ga4.trackEvent',
                      eventName: 'select_content',
                      eventParams: {
                        content_type: 'boton',
                        section: 'Yiro :: configuracionTarjeta :: menu',
                        previous_section: 'dashboard',
                        selected_content: 'Activa tu tarjeta física',
                        destination_page: `${host}/dashboard/card-configuration/activaTarjetaFisica/inicio`,
                      },
                    });
                  }}
                  avatar={<CardIcons color="primary" sx={{ p: '2px' }} />}
                  icon={<Arrow />}
                >
                  <Typography variant="subtitle2">Activa tu tarjeta física</Typography>
                </HandleCard>
              ) : (
                <HandleCard
                  onClick={() => {
                    updatePage('requestPhysicalCard');
                    sendGTMEvent({
                      event: 'ga4.trackEvent',
                      eventName: 'select_content',
                      eventParams: {
                        content_type: 'boton',
                        section: 'Yiro :: configuracionTarjeta :: menu',
                        previous_section: 'dashboard',
                        selected_content: 'Solicita tu tarjeta física',
                        destination_page: `${host}/dashboard/card-configuration/solicitarTarjetaFisica`,
                      },
                    });
                  }}
                  avatar={<CardIcons color="primary" sx={{ p: '2px' }} />}
                  icon={<Arrow />}
                >
                  <Typography variant="subtitle2">Solicita tu tarjeta física</Typography>
                </HandleCard>
              )}
            </>
          )}
          <HandleCard
            avatar={<CardCloseIcon color="primary" sx={{ p: '2px' }} />}
            icon={
              <InputSwitch
                name="temporaryBlock"
                control={control}
                switchProps={{
                  onClick: (e) => {
                    e.preventDefault();
                    setOpenOtp(true);
                    sendGTMEvent({
                      event: 'ga4.trackEvent',
                      eventName: 'select_content',
                      eventParams: {
                        content_type: 'boton',
                        section: 'Yiro :: configuracionTarjeta :: menu',
                        previous_section: 'dashboard',
                        selected_content: 'Bloqueo temporal',
                        destination_page: `${host}/dashboard/card-configuration`,
                      },
                    });
                  },
                }}
              />
            }
          >
            <Typography variant="subtitle2">Bloqueo temporal</Typography>
            <Typography fontSize={10}>Estatus: Tarjeta {isTempBlock() ? 'bloqueada' : 'desbloqueada'}</Typography>
          </HandleCard>

          {isPhysicalCard() && (
            <HandleCard
              onClick={() => {
                updatePage('blockCard');
                sendGTMEvent({
                  event: 'ga4.trackEvent',
                  eventName: 'select_content',
                  eventParams: {
                    content_type: 'boton',
                    section: 'Yiro :: configuracionTarjeta :: menu',
                    previous_section: 'dashboard',
                    selected_content: 'Bloquear por perdida o robo',
                    destination_page: `${host}/dashboard/card-configuration/bloquearTarjeta`,
                  },
                });
              }}
              avatar={<CardCloseIcon color="primary" sx={{ p: '2px' }} />}
              icon={<Arrow />}
            >
              <Typography variant="subtitle2">Bloquear por perdida o robo</Typography>
            </HandleCard>
          )}

          {isPhysicalCard() && (
            <HandleCard
              onClick={() => {
                updatePage('changePin');
                sendGTMEvent({
                  event: 'ga4.trackEvent',
                  eventName: 'select_content',
                  eventParams: {
                    content_type: 'boton',
                    section: 'Yiro :: configuracionTarjeta :: menu',
                    previous_section: 'dashboard',
                    selected_content: 'Cambiar PIN',
                    destination_page: `${host}/dashboard/card-configuration/cambiarPin`,
                  },
                });
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
              sendGTMEvent({
                event: 'ga4.trackEvent',
                eventName: 'select_content',
                eventParams: {
                  content_type: 'boton',
                  section: 'Yiro :: configuracionTarjeta :: menu',
                  previous_section: 'dashboard',
                  selected_content: 'Eliminar cuenta Yiro',
                  destination_page: `${host}/dashboard/card-configuration/eliminarCuenta`,
                },
              });
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
