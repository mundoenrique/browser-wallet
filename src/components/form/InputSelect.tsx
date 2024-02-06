'use client';

import { Controller } from 'react-hook-form';
import Info from '@mui/icons-material/InfoOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { FormControl, FormHelperText, Autocomplete, TextField, InputLabel } from '@mui/material';
//Internal App
import { InputOptionsProps } from '@/interfaces';

function AutocompleteMUI(props: InputOptionsProps): JSX.Element {
  const { name, label, options, labelError, error, value, onChange, disabled, readOnly } = props;
  const textLabel = label ?? name;

  return (
    <>
      <InputLabel sx={{ mb: '12px' }}>{textLabel}</InputLabel>
      <FormControl error={!!error} variant="outlined" sx={{ mb: '5px' }} fullWidth>
        <Autocomplete
          value={value}
          popupIcon={<ArrowForwardIosIcon />}
          id={name}
          disabledItemsFocusable
          options={options}
          disabled={disabled}
          readOnly={readOnly}
          getOptionLabel={(option) => {
            const getData = options.find((obj) => (obj as any).value === option);
            return option.text ?? getData?.text;
          }}
          isOptionEqualToValue={(option) => {
            return option.value === value;
          }}
          onChange={onChange}
          sx={{ width: '100%' }}
          renderInput={(params) => <TextField {...params} placeholder="Selecciona una opción" />}
        />
        <FormHelperText sx={{ height: '20px', ml: 0, display: 'flex', alignItems: 'center' }}>
          {error ? (
            <>
              <Info fontSize="small" sx={{ mr: 1 }} /> {error.message}
            </>
          ) : (
            <>{labelError || ''}</>
          )}
        </FormHelperText>
      </FormControl>
    </>
  );
}

export default function InputSelect(props: InputOptionsProps) {
  const { name, control, onChange, options, ...restProps } = props;

  return (
    <>
      {control ? (
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => {
            return (
              <AutocompleteMUI
                name={name}
                value={field.value}
                options={options}
                onChange={(e, data) => {
                  field.onChange(data?.value);
                  onChange && onChange(e, data);
                }}
                error={error}
                {...restProps}
              />
            );
          }}
        />
      ) : (
        <AutocompleteMUI name={name} onChange={onChange} options={options} />
      )}
    </>
  );
}
