'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography } from '@mui/material';
//Internal app
import { useJwtStore, useMenuStore, useOAuth2Store } from '@/store';
import { CardDebt, LastMovements, Linking, UserWelcome } from '@/components';
import CardInformation from '@/components/cards/cardInformation/CardInformation';
// import { apiGee } from '@/utils/apiGeeConnect';
import { useApi } from '@/hooks/useApiGee';

const movementData = [
  {
    date: '2023-10-29T05:44:36Z',
    title: 'Ingaborg Yatman',
    amount: 984,
    incoming: false,
  },
  {
    date: '2024-02-07T04:43:42Z',
    title: 'Clem Longbottom',
    amount: 889,
    incoming: true,
  },
  {
    date: '2023-05-23T14:48:24Z',
    title: 'Nani Fullagar',
    amount: 355,
    incoming: false,
  },
  {
    date: '2023-06-21T18:54:46Z',
    title: 'Pyotr Aizikov',
    amount: 361,
    incoming: true,
  },
  {
    date: '2023-08-13T11:19:41Z',
    title: 'Mab Bing',
    amount: 402,
    incoming: false,
  },
];

export default function Dashboard() {
  const [cardInfo, setCardInfo] = useState<any>(null);
  const { accessToken } = useOAuth2Store();
  const { token } = useJwtStore();
  const apiGee = useApi();

  const { push } = useRouter();
  const { setCurrentItem } = useMenuStore();
  const cardId = '502c2656-7110-4994-a820-f593e468c6b4';

  useEffect(() => {
    setCurrentItem('home');
  }, [setCurrentItem]);

  useEffect(() => {
    if (accessToken && token) {
      (async () => {
        const data = {
          currentPhaseCode: 'ONB_PHASES_TERMS',
          request: {
            consultant: {
              consultantCode: '00123457',
              firstName: 'RAUL',
              lastName: 'RAMOS',
              documentType: 'DNI',
              documentNumber: '44556678',
              address: 'fsdfjsdj 1234',
              email: 'griniramos@gmail.com',
              phoneNumber: '987654322',
              countryCode: 'PE',
            },
            terms: [
              {
                uuid: '30036e69-5f3e-430a-a8ee-8ce59e9e1320',
              },
              {
                uuid: 'a4e18adf-95af-4b9f-8b95-06c985aca5ef',
              },
            ],
          },
        };

        try {
          const response = await apiGee.post('/onboarding/termsandconditions', data);
          console.log('response-page', response.data);
          // if (response.data.data) {
          //   setCardInfo(response.data.data);
          // }
        } catch (error) {
          console.error('Error generating card info:', error);
        }
      })();
    }
  }, [accessToken, apiGee, token]);

  return (
    <Box
      sx={{
        background: { md: 'linear-gradient(35deg, rgba(146,218,142,0) 45%, rgba(172,255,167,0.6) 100%)' },
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
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
          <CardInformation />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, mb: 2 }}>
            <CardDebt onClick={() => push('/dashboard/debt')} />
            <CardDebt OweMe onClick={() => push('/dashboard/clients')} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle1">Últimos movimientos</Typography>
            <Linking href="/dashboard/movements" color="primary.main" label="Ver todo" mb={0} hidenArrow underline />
          </Box>
          <LastMovements data={movementData} />
        </Box>
      </Box>
    </Box>
  );
}
