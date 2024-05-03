'use client';

import dayjs from 'dayjs';
import { Alert, AlertTitle, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useRef, useState, useCallback } from 'react';
//Internal app
import { fuchsiaBlue } from '@/theme/theme-default';
import { useMenuStore, useNavTitleStore } from '@/store';
import { InputSelect, LastMovements, Linking, ModalError } from '@/components';
import { useUserStore } from '@/store';
import { useApi } from '@/hooks/useApi';

/**
 * Generates the months that would be used for filtering
 * @returns Array with the last three months
 */
const dateRank = (): { value: string; text: string }[] => {
  let i: number;
  let months: { value: string; text: string }[] = [];
  for (i = 0; i < 3; i++) {
    months.push({
      text: dayjs().subtract(i, 'month').locale('es').format('MMMM'),
      value: `${dayjs().subtract(i, 'month').locale('es').format('MM/YYYY')}`,
    });
  }
  return months;
};

export default function Movements() {
  const customApi = useApi();
  const { getUserCardId } = useUserStore();
  const [movementData, setMovementData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);
  const [filterMonth, setFilterMonth] = useState(dateRank()[0].value);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorModal, setErrorModal] = useState<boolean>(false);

  const { setCurrentItem } = useMenuStore();
  const { updateTitle } = useNavTitleStore();

  const containerDesktop = useRef<HTMLDivElement | null>(null);
  const containerPWA = useRef<HTMLDivElement | null>(null);

  const theme = useTheme();

  const scrollHandle = useCallback(async () => {
    if (containerDesktop.current && !isLoading && currentPage <= lastPage - 1) {
      let scroll = containerDesktop.current?.scrollHeight - window.scrollY - window.innerHeight;
      if (scroll <= 100) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    } else if (containerPWA.current && !isLoading && currentPage <= lastPage - 1) {
      let scroll =
        containerPWA.current?.scrollHeight - containerPWA.current?.scrollTop - containerPWA.current?.clientHeight;

      if (scroll <= 20) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    }
  }, [setCurrentPage, isLoading]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    window.addEventListener('scroll', scrollHandle);
    return () => {
      window.removeEventListener('scroll', scrollHandle);
    };
  }, [scrollHandle]);

  const getMovementsData = async () => {
    setIsloading(true);
    setIsError(false);
    setErrorModal(false);
    customApi
      .get(`/cards/${getUserCardId()}/transactions?date=${filterMonth}&days=99&limit=20&currentPage=${currentPage}`)
      .then((response) => {
        if (response.data?.data) {
          setMovementData((state: any) => [...state, ...response.data.data]);
          setLastPage(response.data.metadata.LastPage);
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
    getMovementsData();
  }, [currentPage, filterMonth]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    updateTitle('Movimientos');
    setCurrentItem('home');
  }, [updateTitle, setCurrentItem]);

  return (
    <>
      <Box
        sx={{
          height: { xs: 'calc(100vh - 120px)', md: 'auto' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: { xs: 'flex-start', md: 'center' },
          width: { xs: '100%', md: 360 },
          overflow: 'auto',
          [theme.breakpoints.up('md')]: {
            minHeight: 'calc(100vh + 100px)',
            width: 360,
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
            }}
          />
        </Box>

        <Box
          onScroll={() => {
            scrollHandle();
          }}
          ref={containerPWA}
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
