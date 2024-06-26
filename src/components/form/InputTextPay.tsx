'use client';

import { Controller } from 'react-hook-form';
import { useState, useEffect, forwardRef } from 'react';
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
import { NumericFormat, NumericFormatProps } from 'react-number-format';
//Internal app
import { GainIcons } from '%/Icons';
import { TextFieldProps, NumericFormatCustomInput } from '@/interfaces';
import { fuchsiaBlue } from '@/theme/theme-default';

function formatToDecimals(value: string | number, decimals: number = 2): string {
  const numberValue = parseFloat(value as string);
  if (isNaN(numberValue)) return '';
  return numberValue.toFixed(decimals);
}

function InputTextPay(props: TextFieldProps): JSX.Element {
  const { name, label, labelError, type, error, value, onChange, disabled, readOnly } = props;

  const [internalValue, setInternalValue] = useState(value);

  const textLabel = label ?? name;

  useEffect(() => {
    !value && setInternalValue('');
  }, [value]);

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
          value={internalValue}
          onChange={onChange}
          disabled={disabled}
          readOnly={readOnly}
          inputComponent={NumericFormatCustom as any}
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

/**
 * Custom field used to deliver numerical data
 *
 * @param name - Name of the field - React Hook Form.
 * @param control - Object provided by the useForm method - React Hook Form.
 * @param label - The label of the input.
 * @param labelError - Text for error message.
 * @param onChange - Detect the change in the input.
 * @param disabled - Disable input.
 * @param readOnly - Make the input read-only.
 * @returns The value assigned to the input.
 * @throws If there is an error in any field that does not comply with the regular expressions.
 * @label React Hook Form - {@link https://react-hook-form.com/docs/useform/control}
 * @label Material UI - {@link https://mui.com/material-ui/api/outlined-input/}
 */
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
        <InputTextPay name={name} onChange={onChange} {...restProps} />
      )}
    </>
  );
}

const NumericFormatCustom = forwardRef<NumericFormatProps, NumericFormatCustomInput>(function NumericFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      valueIsNumericString
      decimalScale={2}
      fixedDecimalScale
    />
  );
});
