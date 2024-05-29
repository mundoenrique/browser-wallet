'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Avatar, Box, Button, Typography, useTheme, useMediaQuery } from '@mui/material';
//Internal app
import { FilterIcons } from '%/Icons';
import Filters from './partial/filters';
import ClientList from './partial/listClients';
import { fuchsiaBlue } from '@/theme/theme-default';
import { useMenuStore, useNavTitleStore } from '@/store';
import { InputCheckGroupOptionProps } from '@/interfaces';
import { ContainerLayout, Linking, ModalResponsive } from '@/components';

const checkboxOptions = [
  { text: 'Todos mis cobros', value: '' },
  { text: 'Cobrado', value: '2' },
  { text: 'Cobros pendientes', value: '3' },
  { text: 'Cobros vencidos', value: '4' },
  { text: 'Cancelado', value: '5' },
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
    MAIN: 'MAIN',
    FILTERS: 'FILTERS',
  };

  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.up('md'));

  const { setCurrentItem } = useMenuStore();
  const { updateTitle } = useNavTitleStore();

  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<string>(ENUM_VIEW.MAIN);
  const [paymentStatus, setPaymentStatus] = useState<string>('Todos mis cobros');
  const [month, setMonth] = useState<InputCheckGroupOptionProps>({ text: '', value: '1' });
  const [paymentStatusCode, setPaymentStatusCode] = useState<string>(checkboxOptions[0].value);

  const [lastPage, setLastPage] = useState<number>(1);
  const [clientsData, setClientsData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const containerPWA = useRef<HTMLDivElement | null>(null);
  const containerDesktop = useRef<HTMLDivElement | null>(null);

  const filterActive = currentView === ENUM_VIEW.FILTERS;
  const disabledBtnDelete = '3';

  const reset = () => {
    setCurrentPage(1);
    setClientsData([]);
    setLastPage(1);
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
    setCurrentView(ENUM_VIEW.MAIN);
    reset();
    await getClientAPI();
  };

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
    const newData: never[] | any = data.data;
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

  useEffect(() => {
    updateTitle('Mis clientes');
    setCurrentItem('Inicio');
  }, [updateTitle, setCurrentItem]);

  return (
    <>
      <ContainerLayout>
        <Box
          sx={{
            height: { xs: 'calc(100vh - 120px)', md: 'auto' },
            width: { xs: '100%', md: 360 },
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
              sx={{ mb: 5, display: { xs: 'none', md: 'block' } }}
            >
              Mis clientes
            </Typography>

            <Typography align="center" color={fuchsiaBlue[800]} variant="body1" fontWeight={700} fontSize={12}>
              Total deuda clientes
            </Typography>

            <Typography variant="h6" align="center" color={fuchsiaBlue[800]} sx={{ mb: 2 }}>
              S/ 720.00
            </Typography>

            <Linking
              onClick={() => (filterActive ? setCurrentView(ENUM_VIEW.MAIN) : undefined)}
              href={!filterActive ? '/dashboard' : '#'}
              label="Volver"
              mb={2}
              color={fuchsiaBlue[800]}
              iconSize={{ height: 20, width: 20 }}
              adormentStart
            />
          </Box>

          {filterActive ? (
            <Filters
              months={months}
              monthDefault={month}
              checkboxOptions={checkboxOptions}
              handleFilters={() => handleFilters()}
              checkboxOptionDefault={paymentStatusCode}
              onChangeMonth={(item: InputCheckGroupOptionProps) => onChangeMonth(item)}
              onChangeCheckbox={(item: InputCheckGroupOptionProps) => onChangeCheckbox(item)}
            />
          ) : (
            <Box
              onScroll={() => {
                scrollHandle();
              }}
              ref={containerPWA}
              sx={{
                display: 'block',
                height: { xs: 'calc(100% + 100px)', md: 'auto' },
                background: { xs: 'white', md: 'none' },
                borderRadius: { xs: '12px', md: '0' },
                overflow: { xs: 'auto', md: 'hidden' },
                px: 3,
                pb: 2,
              }}
            >
              <Button
                variant="text"
                color="secondary"
                startIcon={
                  <Avatar sx={{ width: 28, height: 28, bgcolor: fuchsiaBlue[100] }}>
                    <FilterIcons color="primary" fontSize="small" />
                  </Avatar>
                }
                sx={{ justifyContent: 'flex-start' }}
                onClick={() => (match ? setCurrentView(ENUM_VIEW.FILTERS) : setOpen(true))}
              >
                {month.text && paymentStatus && `${month.text} - ${paymentStatus}  `}
                {month.text && !paymentStatus && `${month.text}`}
                {!month.text && paymentStatus && `${paymentStatus}`}
              </Button>
              <ClientList data={clientsData} loading={isLoading} disabledBtnDelete={disabledBtnDelete} />
            </Box>
          )}
        </Box>
      </ContainerLayout>
      <ModalResponsive open={open} handleClose={() => setOpen(false)}>
        <Box sx={{ textAlign: 'start' }}>
          <Filters
            months={months}
            monthDefault={month}
            checkboxOptions={checkboxOptions}
            handleFilters={() => handleFilters()}
            checkboxOptionDefault={paymentStatusCode}
            onChangeMonth={(item: InputCheckGroupOptionProps) => onChangeMonth(item)}
            onChangeCheckbox={(item: InputCheckGroupOptionProps) => onChangeCheckbox(item)}
          />
        </Box>
      </ModalResponsive>
    </>
  );
}
