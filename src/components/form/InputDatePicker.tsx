'use client';

import 'dayjs/locale/es';
import { Controller } from 'react-hook-form';
import Info from '@mui/icons-material/InfoOutlined';
import { FormHelperText, InputLabel } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
//Internal App
import { CalendarIcons } from '%/Icons';
import { InputDatePickerProps } from '@/interfaces';

function DatePickerMUI(props: InputDatePickerProps): JSX.Element {
  const { name, label, labelError, error, onChange, value, views, format, disabled, readOnly } = props;

  const inputLabel = label ?? name;

  return (
    <>
      <InputLabel sx={{ mb: 3 / 2 }}>{label}</InputLabel>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'es'}>
        <DatePicker
          slots={{ openPickerIcon: CalendarIcons }}
          disabled={disabled}
          readOnly={readOnly}
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
          sx={{
            width: '100%',
            '&>.MuiFormLabel-root': { display: 'none' },
            '&>.MuiInputBase-root': { pr: 0 },
            '&>.MuiInputBase-root>.MuiInputAdornment-root>.MuiButtonBase-root': {
              borderRadius: '50%',
              bgcolor: 'secondary.light',
              color: 'primary.main',
              mr: 3 / 2,
              p: '4px',
            },
          }}
        />
        <FormHelperText
          sx={{ color: 'error.main', height: 20, ml: 0, display: 'flex', alignItems: 'center' }}
          id={`${label}-helperText`}
        >
          {error ? (
            <>
              <Info fontSize="small" sx={{ mr: 1 }} /> {error.message}
            </>
          ) : (
            <>{labelError || ''}</>
          )}
        </FormHelperText>
      </LocalizationProvider>
    </>
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
                field.onChange(e);
                onChange && onChange(e);
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
