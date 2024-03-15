'use client';

import { Box, Button } from '@mui/material';
//Internal app
import { IFiltersProps } from '@/interfaces';
import { InputCheckGroup, InputSelect } from '@/components';

export default function Filters(props: IFiltersProps): JSX.Element {
  const {
    checkboxOptions,
    checkboxOptionDefault,
    onChangeCheckbox,
    months,
    onChangeMonth,
    monthDefault,
    handleFilters,
  } = props;
  return (
    <Box sx={{ px: 3 }} component="form" onSubmit={handleFilters}>
      <InputSelect
        name="Por el mes:"
        options={months}
        onChange={(e: any, newValue: any) => onChangeMonth(newValue)}
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
