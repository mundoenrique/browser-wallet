'use client';

import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { sendGTMEvent } from '@next/third-parties/google';
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
  { text: 'Cobrado', value: 'PAID' },
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

  const [clientsData, setClientsData] = useState<any>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const [isLoading, setIsloading] = useState<boolean>(false);

  const [filterMonth, setFilterMonth] = useState(dateRank()[0]);

  const [currentView, setCurrentView] = useState<string>(ENUM_VIEW.MAIN);

  const [paymentStatus, setPaymentStatus] = useState<string>('Todos mis cobros');

  const [paymentStatusCode, setPaymentStatusCode] = useState<string>(checkboxOptions[0].value);

  const isClients = useRef<boolean>(false);

  const containerDesktop = useRef<HTMLDivElement | null>(null);

  const filterActive = currentView === ENUM_VIEW.FILTERS;

  const disabledBtnDelete = 'PENDING';

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
    await getClientAPI();
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

  const getClientAPI = async () => {
    setIsloading(true);
    setError(false);
    api
      .get(`/payments/${user.userId}/chargelist`, {
        params: {
          days: 30,
          limit: 100,
          page: currentPage,
          date: filterMonth.value,
          transactionCode: paymentStatusCode,
        },
      })
      .then((response) => {
        const {
          data: { data },
        } = response;
        if (data) {
          isClients.current = false;
          setClientsData((state: any) => [...state, ...data]);
        } else {
          isClients.current = true;
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

  const changeViewFilters = () => {
    setClientsData([]);
    setCurrentView(ENUM_VIEW.FILTERS);
  };

  useEffect(() => {
    updateTitle('Mis clientes');
    setCurrentItem('Inicio');
  }, [updateTitle, setCurrentItem]);

  useEffect(() => {
    getClientAPI();
  }, [currentPage]); //eslint-disable-line react-hooks/exhaustive-deps

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
                onClick={() => (match ? changeViewFilters() : setOpen(true))}
              >
                {`${filterMonth.text ?? ''} ${filterMonth.text && paymentStatus && '-'} ${paymentStatus ?? ''}`}
              </Button>
              <ClientList
                data={clientsData}
                loading={isLoading}
                disabledBtnDelete={disabledBtnDelete}
                error={error}
                isClients={isClients.current}
              />
            </Box>
          )}
          {clientsData.length > 25 * currentPage - 1 && clientsData.length < 100 && (
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <Linking href="#" onClick={() => setCurrentPage((state) => state + 1)} label="➕ Ver más" />
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
              setOpen(false);
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
