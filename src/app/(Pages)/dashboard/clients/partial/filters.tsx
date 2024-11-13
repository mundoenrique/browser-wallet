'use client';

import { useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { sendGTMEvent } from '@next/third-parties/google';
//Internal app
import { useHeadersStore } from '@/store';
import { IFiltersProps } from '@/interfaces';
import { InputCheckGroup, InputSelect } from '@/components';

export default function Filters(props: Readonly<IFiltersProps>): JSX.Element {
  const {
    checkboxOptions,
    checkboxOptionDefault,
    onChangeCheckbox,
    months,
    onChangeMonth,
    monthDefault,
    handleFilters,
  } = props;

  const host = useHeadersStore((state) => state.host);

  useEffect(() => {
    sendGTMEvent({
      event: 'ga4.trackEvent',
      eventName: 'page_view_ga4',
      eventParams: {
        page_location: `${host}/dashboard/clients/filtro`,
        page_title: 'Yiro :: misClientes :: filtro',
        page_referrer: `${host}/dashboard/clients`,
        section: 'Yiro :: misClientes :: filtro',
        previous_section: 'dashboard',
      },
    });
  }, [host]);

  return (
    <Box sx={{ px: 3 }} component="form" onSubmit={handleFilters}>
      <InputSelect
        name="Por el mes:"
        options={months}
        disableClearable
        onChange={(e: any, newValue: any) => {
          onChangeMonth(newValue);
        }}
        value={monthDefault.value}
      />
      <InputCheckGroup
        name="Por el estado del cobro"
        options={checkboxOptions}
        defaultValue={checkboxOptionDefault}
        onChange={(option) => onChangeCheckbox(option)}
      />
      <Box sx={{ py: 2 }}>
        <Button variant="contained" type="submit" fullWidth>
          Filtrar
        </Button>
      </Box>
    </Box>
  );
}
