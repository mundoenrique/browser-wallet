'use client';

import dayjs from 'dayjs';
import { sendGTMEvent } from '@next/third-parties/google';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Avatar, Box, Button, Typography, useTheme, useMediaQuery } from '@mui/material';
//Internal app
import { api } from '@/utils/api';
import { FilterIcons } from '%/Icons';
import Filters from './partial/filters';
import ClientList from './partial/listClients';
import { fuchsiaBlue } from '@/theme/theme-default';
import { InputCheckGroupOptionProps } from '@/interfaces';
import { ContainerLayout, Linking, ModalResponsive } from '@/components';
import { useUserStore, useUiStore, useChargeStore, useMenuStore, useNavTitleStore, useHeadersStore } from '@/store';

const checkboxOptions = [
  { text: 'Todos mis cobros', value: '' },
  { text: 'Cobrado', value: 'CHARGED' },
  { text: 'Cobros pendientes', value: 'PENDING' },
  { text: 'Cobros vencidos', value: 'EXPIRED' },
  { text: 'Cancelado', value: 'CANCELLED' },
];

/**
 * Generates the months that would be used for filtering
 * @returns Array with the last three months
 */
const dateRank = (): { text: string; value: string }[] => {
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

export default function Clients() {
  const ENUM_VIEW = {
    MAIN: 'MAIN',
    FILTERS: 'FILTERS',
  };

  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.up('md'));

  const user = useUserStore((state) => state.user);

  const host = useHeadersStore((state) => state.host);

  const setModalError = useUiStore((state) => state.setModalError);

  const updateTitle = useNavTitleStore((state) => state.updateTitle);

  const chargeAmount = useChargeStore((state) => state.chargeAmount);

  const setCurrentItem = useMenuStore((state) => state.setCurrentItem);

  const [open, setOpen] = useState<boolean>(false);

  const [error, setError] = useState<boolean>(false);

  const [lastPage, setLastPage] = useState<number>(1);

  const [clientsData, setClientsData] = useState<any>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const [isLoading, setIsloading] = useState<boolean>(false);

  const [filterMonth, setFilterMonth] = useState(dateRank()[0]);

  const [filteredClientData, setFilteredClientData] = useState<any>([]);

  const [currentView, setCurrentView] = useState<string>(ENUM_VIEW.MAIN);

  const [paginatedClientData, setPaginatedClientData] = useState<any>([]);

  const [paymentStatus, setPaymentStatus] = useState<string>('Todos mis cobros');

  const [paymentStatusCode, setPaymentStatusCode] = useState<string>(checkboxOptions[0].value);

  const containerPWA = useRef<HTMLDivElement | null>(null);

  const containerDesktop = useRef<HTMLDivElement | null>(null);

  const filterActive = currentView === ENUM_VIEW.FILTERS;
  const disabledBtnDelete = 'PENDING';

  const initialized = useRef<boolean>(false);

  useEffect(() => {
    sendGTMEvent({
      event: 'ga4.trackEvent',
      eventName: 'page_view_ga4',
      eventParams: {
        page_location: `${host}/dashboard/clients`,
        page_title: 'Yiro :: misClientes',
        page_referrer: `${host}/dashboard`,
        section: 'Yiro :: misClientes',
        previous_section: 'dashboard',
      },
    });
  }, [host]);

  const onChangeCheckbox = (item: InputCheckGroupOptionProps) => {
    setPaymentStatusCode(item.value);
    setPaymentStatus(item.text);
  };

  const handleFilters = async (e: Event) => {
    e.preventDefault();
    setCurrentView(ENUM_VIEW.MAIN);
    sendGTMEvent({
      event: 'ga4.trackEvent',
      eventName: 'select_content',
      eventParams: {
        content_type: 'boton',
        section: 'Yiro :: misClientes',
        previous_section: 'dashboard',
        selected_content: 'Filtro',
        destination_page: `${host}/dashboard/clients`,
      },
    });
  };

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
  }, [setCurrentPage, isLoading, lastPage]); //eslint-disable-line react-hooks/exhaustive-deps

  const getClientAPI = async () => {
    setIsloading(true);
    setError(false);
    api
      .get(`/payments/${user.userId}/chargelist`, {
        params: { days: 30, limit: 100, page: 1, date: filterMonth.value },
      })
      .then((response) => {
        const {
          data: { data },
        } = response;
        if (data) {
          setClientsData(data);
        }
      })
      .catch((e) => {
        setError(true);
        setModalError({ error: e });
      })
      .finally(() => {
        setIsloading(false);
      });
  };

  const createPagination = (data: [], page: number) => {
    setIsloading(true);
    const itemsPage = 20;
    setLastPage(Math.ceil(data.length / itemsPage));
    const startIndex = (page - 1) * itemsPage;
    const endIndex = startIndex + itemsPage;
    data.sort((a: any, b: any) => (new Date(b.date) as any) - (new Date(a.date) as any));
    setTimeout(() => {
      setIsloading(false);
    }, 1000);
    return data.slice(startIndex, endIndex);
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollHandle);
    return () => {
      window.removeEventListener('scroll', scrollHandle);
    };
  }, [scrollHandle]);

  useEffect(() => {
    if (!initialized.current) {
      getClientAPI();
      initialized.current = true;
    } else {
      initialized.current = false;
    }
  }, [filterMonth]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    updateTitle('Mis clientes');
    setCurrentItem('Inicio');
  }, [updateTitle, setCurrentItem]);

  useEffect(() => {
    setPaginatedClientData([]);
    setCurrentPage(1);
    if (!(paymentStatusCode === '')) {
      setFilteredClientData(clientsData.filter((el: any) => el.status == paymentStatusCode));
      return;
    }
    setFilteredClientData(clientsData);
  }, [paymentStatusCode, clientsData]);

  useEffect(() => {
    !isLoading &&
      setPaginatedClientData((currentState: any) => [
        ...currentState,
        ...createPagination(filteredClientData, currentPage),
      ]);
  }, [filteredClientData, currentPage]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <ContainerLayout>
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
              Mis clientes
            </Typography>

            <Typography align="center" color={fuchsiaBlue[800]} variant="body1" fontWeight={700} fontSize={12}>
              Total deuda clientes
            </Typography>

            <Typography variant="h6" align="center" color={fuchsiaBlue[800]} sx={{ mb: 2 }}>
              {Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(chargeAmount)}
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
              months={dateRank()}
              monthDefault={filterMonth}
              checkboxOptions={checkboxOptions}
              handleFilters={(e) => handleFilters(e)}
              checkboxOptionDefault={paymentStatusCode}
              onChangeMonth={setFilterMonth}
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
                {`${filterMonth.text ?? ''} ${filterMonth.text && paymentStatus && '-'} ${paymentStatus ?? ''}`}
              </Button>
              <ClientList
                data={paginatedClientData}
                loading={isLoading}
                disabledBtnDelete={disabledBtnDelete}
                error={error}
              />
            </Box>
          )}
        </Box>
      </ContainerLayout>
      <ModalResponsive open={open} handleClose={() => setOpen(false)}>
        <Box sx={{ textAlign: 'start' }}>
          <Filters
            months={dateRank()}
            monthDefault={filterMonth}
            checkboxOptions={checkboxOptions}
            handleFilters={(e) => {
              handleFilters(e);
            }}
            checkboxOptionDefault={paymentStatusCode}
            onChangeMonth={setFilterMonth}
            onChangeCheckbox={(item: InputCheckGroupOptionProps) => onChangeCheckbox(item)}
          />
        </Box>
      </ModalResponsive>
    </>
  );
}
