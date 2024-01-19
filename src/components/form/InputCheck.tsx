'use client';

import { Controller } from 'react-hook-form';
import { FormControl, FormHelperText, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
//Internal App
import { InputCheckProps } from '@/interfaces';

function InputCheckMUI(props: InputCheckProps): JSX.Element {
  const { name, label, labelError, onChange, onClick, checked, value, error, disabled } = props;

  const textLabel = label ?? name;

  return (
    <FormControl component="fieldset" variant="standard" fullWidth>
      <FormGroup onClick={onClick}>
        <FormControlLabel
          value={value}
          disabled={disabled}
          checked
          control={<Checkbox id={name} checked={checked} onChange={onChange} />}
          label={textLabel}
          sx={{ alignItems: 'flex-start', '&>.MuiButtonBase-root': { pt: 0 } }}
        />
      </FormGroup>
      <FormHelperText sx={{ color: 'error.main', height: '20px' }} id={`${label}-helperText`}>
        {error ? error.message : labelError || ''}
      </FormHelperText>
    </FormControl>
  );
}

export default function InputCheck(props: InputCheckProps) {
  const { name, control, onChange, onClick, ...restProps } = props;

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
              onClick={onClick}
              checked={field.value === '' ? false : true}
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
        <InputCheckMUI name={name} onChange={onChange} onClick={onClick} {...restProps} />
      )}
    </>
  );
}
