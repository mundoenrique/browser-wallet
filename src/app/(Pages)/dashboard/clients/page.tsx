'use client';
import { Box, Button, Typography } from '@mui/material';
import { use, useCallback, useEffect, useRef, useState } from 'react';
//Internal app

import { FilterIcons } from '%/Icons';
import { InputCheckGroupOptionProps } from '@/interfaces';
import theme, { fuchsiaBlue } from '@/theme/theme-default';
import { ClientList, Filters } from './partial';

const checkboxOptions = [
  { text: 'Todos mis cobros', value: '' },
  { text: 'Cobrado', value: '2' },
  { text: 'Cobros pendientes', value: '3' },
  { text: 'Cobros vencidos', value: '4' },
];

const months = [
  { text: 'Enero', value: '1' },
  { text: 'Febrero', value: '2' },
  { text: 'Marzo', value: '3' },
  { text: 'Abril', value: '4' },
  { text: 'Mayo', value: '5' },
  { text: 'Junio', value: '6' },
  { text: 'Julio', value: '7' },
  { text: 'Agosto', value: '8' },
  { text: 'Septiembre', value: '9' },
  { text: 'Octubre', value: '10' },
  { text: 'Noviembre', value: '11' },
  { text: 'Diciembre', value: '12' },
];

export default function Clients() {
  const ENUM_VIEW = {
    PRINCIPAL: 'PRINCIPAL',
    FILTERS: 'FILTERS',
  };

  const [currentView, setCurrentView] = useState(ENUM_VIEW.FILTERS);
  const [paymentStatusCode, setPaymentStatusCode] = useState(checkboxOptions[0].value);
  const [paymentStatus, setPaymentStatus] = useState('Todos mis cobros');
  const [month, setMonth] = useState<InputCheckGroupOptionProps>({ text: '', value: '1' });
  const [isLoading, setIsloading] = useState<boolean>(false);
  //Scroll
  const [clientsData, setClientsData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);
  const containerDesktop = useRef<HTMLDivElement | null>(null);
  const containerPWA = useRef<HTMLDivElement | null>(null);

  const reset = () => {
    setCurrentPage(1);
    setClientsData([]);
    setLastPage(1);
  };

  const handleChangeView = (view: string) => {
    setCurrentView(view);
  };

  const onChangeCheckbox = (item: InputCheckGroupOptionProps) => {
    setPaymentStatusCode(item.value);
    setPaymentStatus(item.text);
  };

  const onChangeMonth = (item: InputCheckGroupOptionProps) => {
    if (item.text) setMonth(item);
    else setMonth({ text: '', value: '' });
  };

  const handleFilters = async () => {
    setCurrentView(ENUM_VIEW.PRINCIPAL);
    reset();
    await getClientAPI();
  };

  //TODO: Direccion del scroll
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

  const getClientAPI = async () => {
    const response = await fetch(
      `./clients/api?limit=10&currentPage=${currentPage}&month=${month.value}&status=${paymentStatusCode}`
    );
    const data: any = await response.json();
    const newData: never[] | any = [...clientsData, ...data.data];
    setClientsData(newData);
    setLastPage(data.metadata.LastPage);
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollHandle);
    return () => {
      window.removeEventListener('scroll', scrollHandle);
    };
  }, [scrollHandle]);

  useEffect(() => {
    (async () => {
      setIsloading(true);
      const response = await fetch(
        `./clients/api?limit=10&currentPage=${currentPage}&month=${month.value}&status=${paymentStatusCode}`
      );
      const data: any = await response.json();
      const newData: never[] | any = [...clientsData, ...data.data];
      setClientsData(newData);
      setLastPage(data.metadata.LastPage);
      setIsloading(false);
    })();
  }, [currentPage]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box
      sx={{
        minHeight: { xs: 'calc(100vh - 120px)', md: '1000px' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: { xs: 'start', md: 'center' },
        width: 360,
        mx: { xs: 'auto', md: 0 },
        overflow: 'auto',
        [theme.breakpoints.up('sm')]: {
          minHeight: 'calc(100vh + 100px)',
          width: '360px',
        },
      }}
      ref={containerDesktop}
    >
      <Box>
        <Box sx={{ paddingX: 3 }}>
          <Typography
            variant="h6"
            align="center"
            color={fuchsiaBlue[800]}
            sx={{ mb: '40px', display: { xs: 'none', md: 'block' } }}
          >
            Mis clientes
          </Typography>
          <Typography
            align="center"
            color={fuchsiaBlue[800]}
            sx={{ fontSize: '12px', lineHeight: '16px', fontWeight: 700, letterSpacing: '0.1px' }}
          >
            Total deuda clientes
          </Typography>

          <Typography
            variant="h6"
            align="center"
            color={fuchsiaBlue[800]}
            sx={{ mb: '40px', display: { xs: 'none', md: 'block' } }}
          >
            S/ 720.00
          </Typography>
        </Box>
        {currentView === ENUM_VIEW.FILTERS ? (
          <Filters
            handleChangeView={handleChangeView}
            checkboxOptions={checkboxOptions}
            checkboxOptionDefault={paymentStatusCode}
            onChangeCheckbox={(item: InputCheckGroupOptionProps) => onChangeCheckbox(item)}
            months={months}
            onChangeMonth={(item: InputCheckGroupOptionProps) => onChangeMonth(item)}
            monthDefault={month}
            handleFilters={() => handleFilters()}
          />
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              background: { xs: 'white', md: 'none' },

              borderRadius: { xs: '12px ', md: '0' },
            }}
          >
            <Box sx={{ paddingX: 3, paddingY: 2 }}>
              <Button
                variant="text"
                color="secondary"
                startIcon={<FilterIcons color="primary" />}
                onClick={() => setCurrentView(ENUM_VIEW.FILTERS)}
              >
                {month.text && paymentStatus && `${month.text} - ${paymentStatus}  `}
                {month.text && !paymentStatus && `${month.text}`}
                {!month.text && paymentStatus && `${paymentStatus}`}
              </Button>
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
                borderRadius: { xs: '12px ', md: '0' },
                overflow: { xs: 'auto', md: 'hidden' },
                paddingX: 3,
                paddingY: 2,
              }}
            >
              <ClientList data={clientsData} loading={isLoading} />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
