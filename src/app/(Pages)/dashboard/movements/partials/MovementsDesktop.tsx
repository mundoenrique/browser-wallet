'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
//Internal app
import { InputSelect, LastMovements, Linking } from '@/components';

import { fuchsiaBlue } from '@/theme/theme-default';

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
      value: `${dayjs().subtract(i, 'month').locale('es').format('M')}`,
    });
  }
  return months;
};

export default function MovementsDesktop() {
  const [movementData, setMovementData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);
  const [filterMonth, setFilterMonth] = useState(dateRank()[0].value);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const container = useRef<HTMLDivElement | null>(null);

  //TODO: Direccion del scroll
  const scrollHandle = useCallback(async () => {
    if (container.current && !isLoading && currentPage <= lastPage - 1) {
      let scroll = container.current?.scrollHeight - window.scrollY - window.innerHeight;
      if (scroll <= 100) {
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

  useEffect(() => {
    (async () => {
      setIsloading(true);
      const response = await fetch(`./movements/api?limit=10&currentPage=${currentPage}`);
      const data: any = await response.json();
      const newData: never[] | any = [...movementData, ...data.data];
      setMovementData(newData);
      setLastPage(data.metadata.LastPage);
      setIsloading(false);
    })();
  }, [currentPage]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh + 200px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: { xs: 'start', md: 'center' },
        width: 360,
        mx: { xs: 'auto', md: 0 },
      }}
      ref={container}
    >
      <Box>
        <Box sx={{ paddingX: 3 }}>
          <Typography
            variant="h6"
            align="center"
            color={fuchsiaBlue[800]}
            sx={{ mb: '40px', display: { xs: 'none', md: 'block' } }}
          >
            Movimientos
          </Typography>

          <Linking
            href="/dashboard"
            label="Volver"
            mb={'20px'}
            color={fuchsiaBlue[800]}
            iconSize={{ height: 20, width: 20 }}
          />
          <InputSelect
            name="Historial"
            options={dateRank()}
            value={filterMonth}
            onChange={(event: any, newValue: any) => {
              setFilterMonth(newValue.value);
            }}
          />
        </Box>
        <Box
          sx={{
            display: 'block',
            background: { xs: 'white', md: 'none' },
            borderRadius: { xs: '12px ', md: '0' },
          }}
        >
          <Box sx={{ paddingX: 3, paddingY: 2, width: '100%' }}>
            <LastMovements data={movementData} loading={isLoading} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
