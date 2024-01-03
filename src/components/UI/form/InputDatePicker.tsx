'use client';

import 'dayjs/locale/es';
import { Controller } from 'react-hook-form';
import { FormHelperText } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
//Internal App

//import useGetFormStore from '@/hooks/zustanHooks';

import { InputDatePickerProps } from '@/interfaces';

function DatePickerMUI(props: InputDatePickerProps): JSX.Element {
  const theme = useTheme();
  const { name, label, labelError, error, onChange, value, views, format } = props;

  const inputLabel = label ?? name;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'es'}>
      <DatePicker
        slotProps={{
          textField: {
            error: !!error,
          },
        }}
        label={inputLabel}
        value={value}
        onChange={onChange}
        views={views}
        format={format ? format : 'DD/MM/YYYY'}
        sx={{ width: '100%' }}
      />
      <FormHelperText sx={{ color: theme.palette.error.main, height: '20px', pl: 2 }} id={`${label}-helperText`}>
        {error ? error.message : labelError || ''}
      </FormHelperText>
    </LocalizationProvider>
  );
}

export default function InputDatePicker(props: InputDatePickerProps) {
  const { name, control, onChange, format, ...restProps } = props;

  return (
    <>
      {control ? (
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <DatePickerMUI
              name={name}
              value={field.value}
              onChange={(e) => {
                field.onChange(e.format(format ? format : 'DD/MM/YYYY'));
                onChange && onChange(e.format(format ? format : 'DD/MM/YYYY'));
              }}
              error={error}
              {...restProps}
            />
          )}
        />
      ) : (
        <DatePickerMUI name={name} onChange={onChange} {...restProps} />
      )}
    </>
  );
}
