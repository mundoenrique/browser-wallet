'use client';

import { Controller } from 'react-hook-form';
import Info from '@mui/icons-material/InfoOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { FormControl, FormHelperText, Autocomplete, TextField, InputLabel } from '@mui/material';
//Internal App
import { InputOptionsProps } from '@/interfaces';

function AutocompleteMUI(props: InputOptionsProps): JSX.Element {
  const { name, label, options, labelError, error, value, onChange, disabled, readOnly, disableClearable } = props;
  const textLabel = label ?? name;

  return (
    <>
      <InputLabel sx={{ mb: 3 / 2 }}>{textLabel}</InputLabel>
      <FormControl error={!!error} variant="outlined" sx={{ mb: '5px' }} fullWidth>
        <Autocomplete
          value={value}
          popupIcon={<ArrowForwardIosIcon />}
          id={name}
          disableClearable={disableClearable}
          disabledItemsFocusable
          options={options}
          disabled={disabled}
          readOnly={readOnly}
          getOptionLabel={(option) => {
            const getData = options.find((obj) => (obj as any).value == option);
            return option.text ?? getData?.text;
          }}
          isOptionEqualToValue={(option) => {
            return option.value == value;
          }}
          onChange={onChange}
          sx={{ width: '100%' }}
          renderInput={(params) => <TextField {...params} placeholder="Selecciona una opción" />}
        />
        <FormHelperText sx={{ height: 20, ml: 0, display: 'flex', alignItems: 'center' }}>
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
 * The autocomplete is a normal text input enhanced by a panel of suggested options.
 *
 * @param name - Name of the field - React Hook Form.
 * @param control - Object provided by the useForm method - React Hook Form.
 * @param label - The label of the radio input.
 * @param labelError - Text for error message.
 * @param onChange - Detect the change in the radio input.
 * @param colorText - Input label color.
 * @param disabled - Disable radio input.
 * @param readOnly - Make the radio input read-only.
 * @param options - Array with number of fields autocomplete.
 * @example Array of objects
 * ```
 * [
 *  { text: 'Peruana', value: 'pe' },
 *  { text: 'Colombiana', value: 'co' },
 * ]
 * ```
 * @returns The value assigned to the autocomplete input.
 * @throws If there is an error in any field that does not comply with the regular expressions.
 * @label React Hook Form - {@link https://react-hook-form.com/docs/useform/control}
 * @label Material UI - {@link https://mui.com/material-ui/react-autocomplete/}
 */
export default function InputSelect(props: InputOptionsProps): JSX.Element {
  const { name, control, onChange, options, disableClearable, ...restProps } = props;

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
                disableClearable={disableClearable}
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
        <AutocompleteMUI name={name} onChange={onChange} options={options} {...restProps} />
      )}
    </>
  );
}
