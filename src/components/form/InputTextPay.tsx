'use client';

import { Controller } from 'react-hook-form';
import Info from '@mui/icons-material/InfoOutlined';
import {
  Avatar,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@mui/material';
//Internal app
import { GainIcons } from '%/Icons';
import { TextFieldProps } from '@/interfaces';
import { fuchsiaBlue } from '@/theme/theme-default';

function InputTextPay(props: TextFieldProps): JSX.Element {
  const { name, label, labelError, type, error, value, onChange, disabled, readOnly } = props;

  const textLabel = label ?? name;

  return (
    <>
      <InputLabel htmlFor={name} sx={{ mb: 3 / 2, textAlign: 'left' }}>
        {textLabel}
      </InputLabel>
      <FormControl variant="outlined" error={!!error} sx={{ mb: '5px' }} fullWidth>
        <OutlinedInput
          id={name}
          type={type ?? 'text'}
          label={textLabel}
          aria-describedby={`${name}-helperText`}
          error={!!error}
          value={value}
          onChange={onChange}
          disabled={disabled}
          readOnly={readOnly}
          sx={{ fontSize: 20, fontWeight: 700, '&>input': { pl: '0 !important' } }}
          startAdornment={
            <InputAdornment position="start">
              <Avatar sx={{ bgcolor: fuchsiaBlue[200], width: 26, height: 26, mr: 1 / 2 }}>
                <GainIcons color="primary" sx={{ p: '2px' }} />
              </Avatar>
              <Typography variant="h6">S/</Typography>
            </InputAdornment>
          }
        />
        <FormHelperText
          sx={{
            height: 20,
            ml: 0,
            display: 'flex',
            alignItems: 'center',
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
            <InputTextPay
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
        <InputTextPay name={name} onChange={onChange} />
      )}
    </>
  );
}
