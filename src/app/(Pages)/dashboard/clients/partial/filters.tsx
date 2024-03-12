'use client';
import { Box, Button } from '@mui/material';
import Arrow from '@mui/icons-material/ArrowBackIos';
//Internal app
import { InputCheckGroup, InputSelect } from '@/components';
import { IFiltersProps } from '@/interfaces';

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
    <Box sx={{ paddingX: 3 }} component="form" onSubmit={handleFilters}>
      <Button variant="return" startIcon={<Arrow />} onClick={handleChangeView}>
        Volver
      </Button>
      <InputSelect
        name="Por el mes:"
        options={months}
        onChange={(event: any, newValue: any) => onChangeMonth(newValue)}
        value={monthDefault.value}
      />
      <InputCheckGroup
        name="Por el estado del cobro"
        options={checkboxOptions}
        defaultValue={checkboxOptionDefault}
        onChange={(option) => onChangeCheckbox(option)}
      />
      <Box sx={{ paddingY: 2 }}>
        <Button variant="contained" type="submit" fullWidth>
          Filtrar
        </Button>
      </Box>
    </Box>
  );
}
