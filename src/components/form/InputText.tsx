'use client';

import { Controller } from 'react-hook-form';
import Info from '@mui/icons-material/InfoOutlined';
import { FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';
//Internal app
import { TextFieldProps } from '@/interfaces';

function InputMUI(props: TextFieldProps): JSX.Element {
  const {
    name,
    label,
    labelError,
    type,
    error,
    value,
    onChange,
    disabled,
    readOnly,
    endAdornment,
    sx,
    colorText,
    inputProps,
  } = props;

  const textLabel = label ?? name;

  return (
    <>
      <InputLabel htmlFor={name} sx={{ mb: 3 / 2, textAlign: 'left', color: colorText }}>
        {textLabel}
      </InputLabel>
      <FormControl variant="outlined" error={!!error} sx={{ mb: '5px' }} fullWidth>
        <OutlinedInput
          sx={sx}
          id={name}
          type={type ?? 'text'}
          label={textLabel}
          aria-describedby={`${name}-helperText`}
          error={!!error}
          value={value}
          onChange={onChange}
          disabled={disabled}
          readOnly={readOnly}
          endAdornment={endAdornment}
          inputProps={{ inputProps }}
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
 * field used for data delivery.
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
  const { name, control, onChange, endAdornment, sx, colorText, inputProps, ...restProps } = props;

  return (
    <>
      {control ? (
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <InputMUI
              colorText={colorText}
              sx={sx}
              name={name}
              value={field.value}
              onChange={(e: any) => {
                field.onChange(e);
                onChange && onChange(e);
              }}
              error={error}
              endAdornment={endAdornment}
              inputProps={inputProps}
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
