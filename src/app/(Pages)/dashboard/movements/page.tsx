'use client';

import dayjs from 'dayjs';
import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import { useEffect, useRef, useState, useCallback } from 'react';
//Internal app
import { useUserStore } from '@/store';
import { useApi } from '@/hooks/useApi';
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
  const customApi = useApi();
  const { getUserCardId } = useUserStore();
  const [movementData, setMovementData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);
  const [filterMonth, setFilterMonth] = useState(dateRank()[0].value);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorModal, setErrorModal] = useState<boolean>(false);

  const initialized = useRef<boolean>(false);

  const { setCurrentItem } = useMenuStore();
  const { updateTitle } = useNavTitleStore();

  const containerDesktop = useRef<HTMLDivElement | null>(null);
  const containerPWA = useRef<HTMLDivElement | null>(null);

  const theme = useTheme();

  const scrollHandle = useCallback(async () => {
    if (containerDesktop.current && !isLoading && currentPage < lastPage) {
      let scroll = containerDesktop.current?.scrollHeight - window.scrollY - window.innerHeight;

      if (scroll <= 100) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    } else if (containerPWA.current && !isLoading && currentPage < lastPage) {
      let scroll =
        containerPWA.current?.scrollHeight - containerPWA.current?.scrollTop - containerPWA.current?.clientHeight;

      if (scroll <= 20) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    }
  }, [setCurrentPage, isLoading]); //eslint-disable-line react-hooks/exhaustive-deps

  const getMovementsData = async () => {
    setIsloading(true);
    setIsError(false);
    setErrorModal(false);
    customApi
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
          minHeight: { xs: 'calc(100vh - 120px)', md: 'auto' },
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
