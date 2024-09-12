'use client';

import { useRouter } from 'next/navigation';
import { Box, Typography } from '@mui/material';
import { useEffect, useState, useCallback } from 'react';
import { sendGTMEvent } from '@next/third-parties/google';
//Internal app
import { api } from '@/utils/api';
import { expiredFormatDate } from '@/utils/dates';
import CardInformation from '@/components/cards/cardInformation/CardInformation';
import { CardCollect, CardDebt, LastMovements, Linking, UserWelcome } from '@/components';
import { useHeadersStore, useChargeStore, useDebStore, useMenuStore, useUiStore, useUserStore } from '@/store';

export default function Dashboard() {
  const { push } = useRouter();

  const { getUserCardId } = useUserStore();

  const host = useHeadersStore((state) => state.host);

  const setDebt = useDebStore((state) => state.setDebt);

  const { userId } = useUserStore((state) => state.user);

  const setCharge = useChargeStore((state) => state.setCharge);

  const setModalError = useUiStore((state) => state.setModalError);

  const setCurrentItem = useMenuStore((state) => state.setCurrentItem);

  const [movementData, setMovementData] = useState<[]>([]);

  const [loadingMovements, setLoadingMovements] = useState<boolean>(false);

  const [errorMovements, setErrorMovements] = useState<boolean>(false);

  const [cardMyDebt, setCardMyDebt] = useState({
    code: '',
    data: {
      amount: null,
      expirationDate: null,
      currencyCode: '',
    },
  });

  const [cardClients, setCardClients] = useState({
    code: '',
    data: {
      amount: null,
      expirationDate: null,
      currencyCode: '',
      clients: null,
    },
  });

  const getMovements = useCallback(async () => {
    setLoadingMovements(true);
    setErrorMovements(false);
    api
      .get(`/cards/${getUserCardId()}/transactions`, {
        params: {
          days: 90,
          limit: 5,
        },
      })
      .then((response: any) => {
        response.data.data && setMovementData(response.data.data);
      })
      .catch((e) => {
        const { code } = e.response?.data?.data || 0;
        setModalError({ code, title: '¡Oops!', description: 'Error al cargar movimientos.' });
      })
      .finally(() => {
        setLoadingMovements(false);
      });
  }, []); //eslint-disable-line

  const getDebtBalance = useCallback(async () => {
    api
      .get(`/payments/${userId}/debtbalance`)
      .then((response: any) => {
        if (response.status === 200) {
          const { data } = response.data;
          setCardMyDebt(response.data);
          setDebt({
            amount: data.amount,
            currencyCode: data.currencyCode,
            expirationDate: data.expirationDate ? expiredFormatDate(data.expirationDate) : 'Datos no disponibles',
          });
        }
      })
      .catch((e) => {
        const { code } = e.response?.data?.data || 0;
        setCardMyDebt({
          code: '',
          data: {
            amount: null,
            expirationDate: null,
            currencyCode: '',
          },
        });
        setModalError({
          code,
          title: 'Algo salió mal',
          description: 'No pudimos cargar la información de tu deuda.',
        });
      });
  }, []); //eslint-disable-line

  const getCharge = useCallback(async () => {
    api
      .get(`/payments/${userId}/charge`)
      .then((response: any) => {
        setCardClients(response.data);
        setCharge(response.data?.data?.amount);
      })
      .catch((e) => {
        const { code } = e.response?.data?.data || 0;
        setCardClients({
          code: '',
          data: {
            amount: null,
            currencyCode: '',
            clients: null,
            expirationDate: null,
          },
        });
        setModalError({
          code,
          title: 'Algo salió mal',
          description: 'No pudimos cargar la información de lo que te deben tus clientes.',
        });
      });
  }, []); //eslint-disable-line

  useEffect(() => {
    setCurrentItem('home');
    getMovements();
    getDebtBalance();
    getCharge();
  }, []); //eslint-disable-line

  useEffect(() => {
    sendGTMEvent({
      event: 'ga4.trackEvent',
      eventName: 'page_view_ga4',
      eventParams: {
        page_location: `${host}/dashboard`,
        page_title: 'dashboard',
        page_referrer: `${host}/signin/interno`,
        section: 'dashboard',
        previous_section: 'Yiro :: login :: interno',
      },
    });
  }, [host]);

  return (
    <>
      <Box
        sx={{
          background: { md: 'linear-gradient(35deg, rgba(146,218,142,0) 45%, rgba(172,255,167,0.6) 100%)' },
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            width: { xs: '100%', sm: 320 },
            mx: { xs: 'auto', md: 3 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <UserWelcome />

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: { xs: 'flex-start', md: 'center' },
              mb: { xs: '60px', md: 0 },
            }}
          >
            <CardInformation />

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                bgcolor: { xs: 'white', sm: 'initial' },
                borderRadius: '14px',
                mt: 2,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, mt: 2, width: 320 }}>
                <CardDebt
                  data={cardMyDebt}
                  onClick={() => {
                    push('/dashboard/debt');
                    sendGTMEvent({
                      event: 'ga4.trackEvent',
                      eventName: 'select_content',
                      eventParams: {
                        content_type: 'boton',
                        section: 'dashboard',
                        previous_section: 'Yiro :: login :: interno',
                        selected_content: 'Me deben',
                        destination_page: `${host}/dashboard/debt`,
                      },
                    });
                  }}
                />
                <CardCollect
                  data={cardClients}
                  onClick={() => {
                    push('/dashboard/clients');
                    sendGTMEvent({
                      event: 'ga4.trackEvent',
                      eventName: 'select_content',
                      eventParams: {
                        content_type: 'boton',
                        section: 'dashboard',
                        previous_section: 'Yiro :: login :: interno',
                        selected_content: 'Mi deuda con Belcorp',
                        destination_page: `${host}/dashboard/clients`,
                      },
                    });
                  }}
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, width: 320 }}>
                <Typography variant="subtitle1">Últimos movimientos</Typography>
                {movementData.length > 0 ? (
                  <Linking
                    href="/dashboard/movements"
                    color="primary.main"
                    label="Ver todo"
                    mb={0}
                    hidenArrow
                    underline
                    onClick={() => {
                      sendGTMEvent({
                        event: 'ga4.trackEvent',
                        eventName: 'select_content',
                        eventParams: {
                          content_type: 'boton',
                          section: 'dashboard',
                          previous_section: 'Yiro :: login :: interno',
                          selected_content: 'Ver todo',
                          destination_page: `${host}/dashboard/movements`,
                        },
                      });
                    }}
                  />
                ) : (
                  <Typography variant="subtitle1" color={'grey'} fontWeight={700} fontSize={'12px'}>
                    Ver todo
                  </Typography>
                )}
              </Box>
              <Box sx={{ width: 320, minHeight: '300px' }}>
                <LastMovements
                  data={movementData}
                  loading={loadingMovements}
                  error={errorMovements}
                  emptySlot={<EmptySlot />}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

const EmptySlot = () => {
  return (
    <Box sx={{ mx: '8px', textAlign: 'center' }}>
      <Typography variant="subtitle2" color="initial">
        ¡Estamos encantados de tenerte con nosotros!
      </Typography>
      <Typography variant="body2" color="initial">
        Tu cuenta está lista para empezar a recibir transacciones. Una vez que realices algún movimiento, comenzarás a
        ver aquí un registro detallado de todas tus transacciones.
      </Typography>
    </Box>
  );
};
