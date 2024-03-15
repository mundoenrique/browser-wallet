'use client';

import { useState } from 'react';
import { Controller } from 'react-hook-form';
import Info from '@mui/icons-material/InfoOutlined';
import { FormControl, FormHelperText, Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';
//Internal App
import { OffCheck, OnCheck } from '%/Icons';
import { InputCheckProps } from '@/interfaces';

function InputCheckMUI(props: InputCheckProps): JSX.Element {
  const {
    name,
    label,
    labelError,
    onChange,
    checked,
    value,
    error,
    disabled,
    mtError = 0,
    labelHandle,
    onClick,
  } = props;

  return (
    <FormControl component="fieldset" variant="standard" fullWidth sx={{ width: labelHandle ? 'auto' : '100%' }}>
      <FormGroup>
        <FormControlLabel
          value={value}
          disabled={disabled}
          checked
          control={
            <Checkbox id={name} checked={checked} icon={<OffCheck />} checkedIcon={<OnCheck />} onChange={onChange} />
          }
          label={
            labelHandle ? (
              <Typography onClick={onClick} variant="body2" sx={{ textDecoration: 'underline' }}>
                {labelHandle}
              </Typography>
            ) : (
              label
            )
          }
          sx={{ alignItems: 'flex-start', '&>.MuiFormControlLabel-label': { fontSize: 14 }, mr: 0 }}
        />
      </FormGroup>
      <FormHelperText
        sx={{
          color: 'error.main',
          height: 20,
          ml: 0,
          display: 'flex',
          alignItems: 'center',
          mt: { xs: mtError, sm: 0 },
        }}
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
 * Checkboxes can be used to turn an option on or off.
 *
 * @param name - Name of the field - React Hook Form.
 * @param control - Object provided by the useForm method - React Hook Form.
 * @param onChange - Detect the change in the checkbox.
 * @param onClick - Detects an action in the checkbox text, used to raise modal.
 * @param checked - Current status (on - off).
 * @param labelHandle - Text used to handle an action.Text used to handle an action.
 * @param restProps - Property used to bring the rest of the component's properties.
 * @returns The value assigned to the checkbox.
 * @throws If there is an error in any field that does not comply with the regular expressions.
 * @label React Hook Form - {@link https://react-hook-form.com/docs/useform/control}
 * @label Material UI - {@link https://mui.com/material-ui/react-checkbox/}
 */
export default function InputCheck(props: InputCheckProps): JSX.Element {
  const { name, control, onChange, onClick, checked, labelHandle, ...restProps } = props;
  const [isChecked, setIsChecked] = useState(checked ? true : false);

  return (
    <>
      {control ? (
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <InputCheckMUI
              name={name}
              value={field.value}
              checked={field.value ? true : false}
              onChange={(e) => {
                setIsChecked(!isChecked);
                onChange && onChange(e);
                field.onChange(e);
              }}
              error={error}
              labelHandle={labelHandle}
              onClick={onClick}
              {...restProps}
            />
          )}
        />
      ) : (
        <InputCheckMUI name={name} onChange={onChange} onClick={onClick} {...restProps} />
      )}
    </>
  );
}
