'use client';

import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { sendGTMEvent } from '@next/third-parties/google';
import { Box, Typography, useTheme } from '@mui/material';
//Internal app
import { api } from '@/utils/api';
import { fuchsiaBlue } from '@/theme/theme-default';
import { capitalizeFirstLetter, filterResponseCode } from '@/utils/toolHelper';
import { InputSelect, LastMovements, Linking, ModalError } from '@/components';
import { useMenuStore, useNavTitleStore, useHeadersStore, useUserStore } from '@/store';

/**
 * Generates the months that would be used for filtering
 * @returns Array with the last three months
 */
const dateRank = (): { value: string; text: string }[] => {
  const handleDate = dayjs().locale('es');

  let months: { value: string; text: string }[] = [];

  for (let i = 0; i < 3; i++) {
    const monthDate = handleDate.subtract(i, 'month');
    months.push({
      text: capitalizeFirstLetter(monthDate.format('MMMM')),
      value: `${monthDate.format('MM/YYYY')}`,
    });
  }
  return months;
};

export default function Movements() {
  const theme = useTheme();

  const { getUserCardId } = useUserStore();

  const { setCurrentItem } = useMenuStore();

  const { updateTitle } = useNavTitleStore();

  const host = useHeadersStore((state) => state.host);

  const [isError, setIsError] = useState<boolean>(false);

  const [movementData, setMovementData] = useState<any>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const [isLoading, setIsloading] = useState<boolean>(false);

  const [errorModal, setErrorModal] = useState<boolean>(false);

  const [filterMonth, setFilterMonth] = useState(dateRank()[0].value);

  const containerDesktop = useRef<HTMLDivElement | null>(null);

  const getMovementsData = async () => {
    setIsloading(true);
    setIsError(false);
    setErrorModal(false);
    api
      .get(`/cards/${getUserCardId()}/transactions`, {
        params: {
          date: filterMonth,
          days: 90,
          limit: 100,
          page: currentPage,
        },
      })
      .then((response) => {
        const {
          data: { data },
        } = response;
        if (data) {
          const newData = filterResponseCode(data);
          setMovementData((state: any) => [...state, ...newData]);
        }
      })
      .catch(() => {
        setIsError(true);
        setErrorModal(true);
      })
      .finally(() => {
        setIsloading(false);
      });
  };

  useEffect(() => {
    updateTitle('Movimientos');
    setCurrentItem('home');
  }, [updateTitle, setCurrentItem]);

  useEffect(() => {
    sendGTMEvent({
      event: 'ga4.trackEvent',
      eventName: 'page_view_ga4',
      eventParams: {
        page_location: `${host}/dashboard/movements`,
        page_title: 'Yiro :: movimientos',
        page_referrer: `${host}/dashboard`,
        section: 'Yiro :: movimientos',
        previous_section: 'dashboard',
      },
    });
  }, [host]);

  useEffect(() => {
    getMovementsData();
  }, [currentPage, filterMonth]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: { xs: 'flex-start', md: 'center' },
          width: { xs: '100%', md: 360 },
          overflow: 'auto',
          [theme.breakpoints.up('md')]: {
            minHeight: 'calc(100vh + 100px)',
            width: 360,
          },
          [theme.breakpoints.down('md')]: {
            height: 'calc(100vh - 120px)',
          },
        }}
        ref={containerDesktop}
      >
        <Box sx={{ px: 3 }}>
          <Typography
            variant="h6"
            align="center"
            color={fuchsiaBlue[800]}
            sx={{ my: 5, display: { xs: 'none', md: 'block' } }}
          >
            Movimientos
          </Typography>

          <Linking
            href="/dashboard"
            label="Volver"
            mb={'20px'}
            color={fuchsiaBlue[800]}
            iconSize={{ height: 20, width: 20 }}
            adormentStart
          />

          <InputSelect
            name="Historial"
            options={dateRank()}
            value={filterMonth}
            disableClearable
            onChange={(e: any, newValue: any) => {
              setFilterMonth(newValue.value);
              setCurrentPage(1);
              setMovementData([]);
            }}
            onClick={() => {
              sendGTMEvent({
                event: 'ga4.trackEvent',
                eventName: 'page_view_ga4',
                eventParams: {
                  content_type: 'boton',
                  section: 'Yiro :: movimientos',
                  previous_section: 'dashboard',
                  selected_content: `filtrar_historial :: ${filterMonth}`,
                  destination_page: `${host}/dashboard/movements`,
                },
              });
            }}
          />
        </Box>

        <Box
          sx={{
            display: 'block',
            height: { xs: 'calc(100% + 100px)', md: 'auto' },
            background: { xs: 'white', md: 'none' },
            borderRadius: { xs: '14px ', md: '0' },
            overflow: { xs: 'auto', md: 'hidden' },
            px: 3,
            py: 2,
          }}
        >
          <LastMovements data={movementData} loading={isLoading} error={isError} />

          {movementData.length > 25 * currentPage - 1 && (
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 1 }}>
              <Linking href="#" onClick={() => setCurrentPage((state) => state + 1)} label="➕ Ver más" />
            </Box>
          )}
        </Box>
      </Box>

      <ModalError
        title="¡Oops!"
        description={
          <>
            <Typography>Error al cargar movimientos.</Typography>
            <Typography
              variant="subtitle2"
              onClick={() => {
                getMovementsData();
              }}
              sx={{ cursor: 'pointer', textDecoration: 'underline' }}
            >
              Intenta de nuevo
            </Typography>
          </>
        }
        open={errorModal}
        handleClose={() => {
          setErrorModal(false);
        }}
      />
    </>
  );
}
