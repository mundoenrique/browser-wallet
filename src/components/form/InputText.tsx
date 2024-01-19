'use client';

import { Controller } from 'react-hook-form';
import Info from '@mui/icons-material/InfoOutlined';
import { Box, FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';
//Internal app
import { TextFieldProps } from '@/interfaces';

function InputMUI(props: TextFieldProps): JSX.Element {
  const { name, label, labelError, type, error, value, onChange, colorText } = props;

  const textLabel = label ?? name;

  return (
    <>
      <InputLabel sx={{ mb: '12px', textAlign: 'left' }}>{textLabel}</InputLabel>
      <FormControl variant="outlined" error={!!error} sx={{ mb: '5px' }} fullWidth>
        <OutlinedInput
          id={name}
          type={type ?? 'text'}
          label={textLabel}
          aria-describedby={`${name}-helperText`}
          error={!!error}
          value={value}
          onChange={onChange}
        />
        <FormHelperText
          sx={{
            height: '20px',
            ml: 0,
            display: 'flex',
            alignItems: 'center',
            color: colorText ? colorText : 'inherit',
          }}
          id={`${name}-helperText`}
        >
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

export default function InputText(props: TextFieldProps) {
  const { name, control, onChange, ...restProps } = props;

  return (
    <>
      {control ? (
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <InputMUI
              name={name}
              value={field.value}
              onChange={(e: any) => {
                field.onChange(e);
                onChange && onChange(e);
              }}
              error={error}
              {...restProps}
            />
          )}
        />
      ) : (
        <InputMUI name={name} onChange={onChange} />
      )}
    </>
  );
}
