'use client';

import { useRouter } from 'next/navigation';
import { Box, Typography } from '@mui/material';
import { useEffect, useState, useCallback } from 'react';
//Internal app
import { useApi } from '@/hooks/useApi';
import { ICardDebt } from '@/interfaces';
import { useMenuStore, useUiStore, useUserStore } from '@/store';
import { CardDebt, LastMovements, Linking, UserWelcome } from '@/components';
import CardInformation from '@/components/cards/cardInformation/CardInformation';

export default function Dashboard() {
  const { push } = useRouter();

  const { setCurrentItem } = useMenuStore();

  const { getUserCardId } = useUserStore();

  const setModalError = useUiStore((state) => state.setModalError);

  const setReloadFunction = useUiStore((state) => state.setReloadFunction);

  const { userId } = useUserStore((state) => state.user);

  const customApi = useApi();

  const [movementData, setMovementData] = useState<[]>([]);

  const [loadingMovements, setLoadingMovements] = useState<boolean>(false);

  const [errorMovements, setErrorMovements] = useState<boolean>(false);

  const [cardMyDebt, setCardMyDebt] = useState<ICardDebt>({
    amount: null,
    expirationDate: null,
    currencyCode: '',
  });

  const [cardClients, setCardClients] = useState<ICardDebt>({
    amount: null,
    expirationDate: null,
    currencyCode: '',
    clients: null,
  });

  const getMovements = useCallback(async () => {
    setLoadingMovements(true);
    setErrorMovements(false);
    customApi
      .get(`/cards/${getUserCardId()}/transactions`, {
        params: {
          days: 90,
          limit: 5,
        },
      })
      .then((response: any) => {
        response.data.data && setMovementData(response.data.data);
      })
      .catch(() => {
        setReloadFunction(() => getMovements());
        setModalError({ title: '¡Oops!', description: 'Error al cargar movimientos.' });
      })
      .finally(() => {
        setLoadingMovements(false);
      });
  }, []); //eslint-disable-line

  const getDebtBalance = useCallback(async () => {
    customApi
      .get(`/payments/${userId}/debtbalance`)
      .then((response: any) => {
        setCardMyDebt(response.data.data);
      })
      .catch(() => {
        setReloadFunction(() => getDebtBalance());
        setCardMyDebt({
          amount: null,
          expirationDate: null,
          currencyCode: '',
        });
        setModalError({
          title: 'Algo salió mal',
          description: 'No pudimos cargar la información de tu deuda. Por favor intentalo más tarde.',
        });
      });
  }, []); //eslint-disable-line

  const getCharge = useCallback(async () => {
    customApi
      .get(`/payments/${userId}/charge`)
      .then((response: any) => {
        setCardClients(response.data.data);
      })
      .catch(() => {
        setReloadFunction(() => getCharge());
        setCardClients({
          amount: null,
          currencyCode: '',
          clients: null,
        });
        setModalError({
          title: 'Algo salió mal',
          description:
            'No pudimos cargar la información de lo que te deben tus clientes. Por favor intentalo más tarde.',
        });
      });
  }, []); //eslint-disable-line

  useEffect(() => {
    setCurrentItem('home');
    getMovements();
    getDebtBalance();
    getCharge();
  }, []); //eslint-disable-line

  return (
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
                }}
              />
              <CardDebt
                data={cardClients}
                OweMe
                onClick={() => {
                  push('/dashboard/clients');
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
