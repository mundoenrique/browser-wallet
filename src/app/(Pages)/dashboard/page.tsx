'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography } from '@mui/material';
//Internal app
import { useMenuStore, useOAuth2Store } from '@/store';
import { CardDebt, LastMovements, Linking, UserWelcome } from '@/components';
import { useApi } from '@/hooks/useApiGee';
import CardInformation from '@/components/cards/cardInformation/CardInformation';

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
  // const grant_type: string = 'client_credentials';
  // const client_id: string | undefined = process.env.NEXT_PUBLIC_APIGEE_APP_CREDENTIALS_KEY;
  // const client_secret: string | undefined = process.env.NEXT_PUBLIC_APIGEE_APP_CREDENTIALS_SECRET;

  const [cardInfo, setCardInfo] = useState<any>(null);
  const { accessToken } = useOAuth2Store();

  const { push } = useRouter();
  const { setCurrentItem } = useMenuStore();
  const api = useApi();
  const cardId = '502c2656-7110-4994-a820-f593e468c6b4';

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('/api/apiGee/gettoken', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json',
          },
        });
        console.log('response-page', response);

        // const token = response.data?.['access_token'] as string;
      } catch (error) {
        console.error('Error generating OAuth2 token:', error);
      }
    })();
  }, []);

  useEffect(() => {
    setCurrentItem('home');
  }, [setCurrentItem]);

  useEffect(() => {
    // if (accessToken && !cardInfo) {
    (async () => {
      try {
        // const response = await api.get('/api/v1.3/cards/' + cardId);
        // const data = response.data.data as string;
        // setCardInfo(data);
        const response = await fetch(`/api/v1.3/cards/${cardId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json',
          },
        });
        console.log('response-page', response.json());
        return response.json();
      } catch (error) {
        console.error('Error generating card info:', error);
      }
    })();
    // }
  }, []);
  // }, [accessToken, api, cardInfo]);

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
