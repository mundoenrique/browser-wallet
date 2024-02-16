'use client';

import { Controller } from 'react-hook-form';
import Info from '@mui/icons-material/InfoOutlined';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { FormControl, FormLabel, FormHelperText, Radio, FormControlLabel, RadioGroup, Box, Stack } from '@mui/material';
//Internal App
import { InputOptionsProps } from '@/interfaces';

function InputRadioMUI(props: InputOptionsProps): JSX.Element {
  const { name, label, labelError, error, value, onChange, options } = props;

  return (
    <FormControl component="fieldset" variant="standard" fullWidth>
      {label && <FormLabel focused={false}>{label}</FormLabel>}
      <RadioGroup
        name={name}
        value={value}
        onChange={onChange}
        sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}
      >
        <Stack spacing="12px" direction="row">
          {options.map((option, i: number) => (
            <Box
              key={i}
              sx={{
                bgcolor: value === option.value ? 'secondary.light' : 'white',
                borderRadius: 1,
                width: 154,
                height: 52,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <FormControlLabel
                value={option.value}
                control={
                  <Radio id={name + option.value} checkedIcon={<CheckBoxIcon />} icon={<CheckBoxOutlineBlankIcon />} />
                }
                label={option.text}
                sx={{ m: 0, p: 0, width: '100%', justifyContent: 'center' }}
              />
            </Box>
          ))}
        </Stack>
      </RadioGroup>
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
    </FormControl>
  );
}

/**
 * Conditional check boxes can be used to activate or deactivate an option.
 *
 * @param name - Name of the field - React Hook Form.
 * @param control - Object provided by the useForm method - React Hook Form.
 * @param onChange - Detect the change in the checkbox.
 * @param options - Array with checkbox quantity.
 * @example Array of objects
 * ```
 * [
 *  { text: 'Yes', value: 'true' },
 *  { text: 'No', value: 'false' },
 * ];
 * ```
 * @param restProps - Property used to bring the rest of the component's properties.
 * @returns The value assigned to the checkbox.
 * @throws If there is an error in any field that does not comply with the regular expressions.
 * @label React Hook Form - {@link https://react-hook-form.com/docs/useform/control}
 * @label Material UI - {@link https://mui.com/material-ui/react-radio-button/}
 * @label Material UI - {@link https://mui.com/material-ui/api/radio/}
 */
export default function InputCheckCondition(props: InputOptionsProps): JSX.Element {
  const { name, control, onChange, options, ...restProps } = props;

  return (
    <>
      {control ? (
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <InputRadioMUI
              name={name}
              value={field.value}
              options={options}
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
        <InputRadioMUI name={name} onChange={onChange} options={options} />
      )}
    </>
  );
}
