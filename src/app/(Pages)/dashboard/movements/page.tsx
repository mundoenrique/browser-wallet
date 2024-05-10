'use client';

import dayjs from 'dayjs';
import { useEffect, useRef, useState, useCallback } from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
//Internal app
import { api } from '@/utils';
import { useUserStore } from '@/store';
import { fuchsiaBlue } from '@/theme/theme-default';
import { useMenuStore, useNavTitleStore } from '@/store';
import { InputSelect, LastMovements, Linking, ModalError } from '@/components';

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
      text: monthDate.format('MMMM'),
      value: `${monthDate.format('MM/YYYY')}`,
    });
  }
  return months;
};

export default function Movements() {
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.down('md'));

  const { getUserCardId } = useUserStore();
  const { setCurrentItem } = useMenuStore();
  const { updateTitle } = useNavTitleStore();

  const [lastPage, setLastPage] = useState<number>(1);
  const [isError, setIsError] = useState<boolean>(false);
  const [movementData, setMovementData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [errorModal, setErrorModal] = useState<boolean>(false);
  const [filterMonth, setFilterMonth] = useState(dateRank()[0].value);

  const initialized = useRef<boolean>(false);
  const containerPWA = useRef<HTMLDivElement | null>(null);
  const containerDesktop = useRef<HTMLDivElement | null>(null);

  const scrollHandle = useCallback(async () => {
    const container = containerDesktop.current || containerPWA.current;
    if (!isLoading && container && currentPage < lastPage) {
      if (match) {
        let scroll = container.scrollHeight - container.scrollTop - container.clientHeight;
        scroll <= 20 && setCurrentPage((prevPage) => prevPage + 1);
      } else {
        let scroll = container?.scrollHeight - window.scrollY - window.innerHeight;

        scroll <= 100 && setCurrentPage((prevPage) => prevPage + 1);
      }
    }
  }, [setCurrentPage, isLoading]); //eslint-disable-line react-hooks/exhaustive-deps

  const getMovementsData = async () => {
    setIsloading(true);
    setIsError(false);
    setErrorModal(false);
    api
      .get(`/cards/${getUserCardId()}/transactions`, {
        params: {
          date: filterMonth,
          days: 90,
          limit: 20,
          page: currentPage,
        },
      })
      .then((response) => {
        const {
          data: { data, metadata },
        } = response;
        if (data) {
          setMovementData((state: any) => [...state, ...data]);
          setLastPage(metadata.lastPage);
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
    if (!initialized.current) {
      getMovementsData();
      initialized.current = true;
    } else {
      initialized.current = false;
    }
  }, [currentPage, filterMonth]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setCurrentPage(1);
    setMovementData([]);
  }, [filterMonth]);

  useEffect(() => {
    updateTitle('Movimientos');
    setCurrentItem('home');
  }, [updateTitle, setCurrentItem]);

  useEffect(() => {
    window.addEventListener('scroll', scrollHandle);
    return () => {
      window.removeEventListener('scroll', scrollHandle);
    };
  }, [scrollHandle]);

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
