'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography } from '@mui/material';
//Internal app
import { useMenuStore } from '@/store';
import { CardDebt, LastMovements, Linking, UserWelcome } from '@/components';
import CardInformation from '@/components/cards/cardInformation/CardInformation';
import { useUserStore } from '@/store';
import { useApi } from '@/hooks/useApi';

export default function Dashboard() {
  const { push } = useRouter();

  const { setCurrentItem } = useMenuStore();

  const { getUserCardId } = useUserStore();

  const customApi = useApi();

  const [movementData, setMovementData] = useState([]);

  const [loadingMovements, setLoadingMovements] = useState<boolean>(false);

  const [error, setError] = useState<boolean>(false);

  const getMovements = useCallback(async () => {
    setLoadingMovements(true);
    setError(false);
    customApi
      .get(`/cards/${getUserCardId()}/transactions?days=99&limit=5`)
      .then((response: any) => {
        response.data?.data && setMovementData(response.data.data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoadingMovements(false);
      });
  }, []); //eslint-disable-line

  useEffect(() => {
    setCurrentItem('home');
    getMovements();
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
      <Box sx={{ width: { xs: '100%', sm: 320 }, mx: { xs: 'auto', md: 3 } }}>
        <UserWelcome />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: 'calc(100vh - 92px)',
            alignItems: 'center',
            justifyContent: { xs: 'flex-start', md: 'center' },
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
              pb: { xs: 3, sm: 'auto' },
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, mt: 2, width: 320 }}>
              <CardDebt onClick={() => push('/dashboard/debt')} />
              <CardDebt OweMe onClick={() => push('/dashboard/clients')} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, width: 320 }}>
              <Typography variant="subtitle1">Últimos movimientos</Typography>
              <Linking href="/dashboard/movements" color="primary.main" label="Ver todo" mb={0} hidenArrow underline />
            </Box>
            <Box sx={{ width: 320 }}>
              <LastMovements data={movementData} loading={loadingMovements} error={error} handleRetry={getMovements} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
