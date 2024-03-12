'use client';

import { Box, Button } from '@mui/material';
import Arrow from '@mui/icons-material/ArrowBackIos';
//Internal app
import { IFiltersProps } from '@/interfaces';
import { InputCheckGroup, InputSelect, Linking } from '@/components';
import { fuchsiaBlue } from '@/theme/theme-default';

export default function Filters(props: IFiltersProps): JSX.Element {
  const {
    handleChangeView,
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
      <Linking
        onClick={handleChangeView}
        href="#"
        label="Volver"
        mb={'20px'}
        color={fuchsiaBlue[800]}
        iconSize={{ height: 20, width: 20 }}
      />
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
