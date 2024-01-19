'use client';

import { Controller } from 'react-hook-form';
import Info from '@mui/icons-material/InfoOutlined';
import { FormControl, FormHelperText, Checkbox, FormControlLabel, FormGroup, Box } from '@mui/material';
//Internal App
import { InputCheckProps } from '@/interfaces';
import { useState } from 'react';

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
      <FormHelperText
        sx={{ color: 'error.main', height: '20px', ml: 0, display: 'flex', alignItems: 'center' }}
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

export default function InputCheck(props: InputCheckProps) {
  const { name, control, onChange, onClick, checked, ...restProps } = props;
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
              onClick={onClick}
              checked={field.value ? true : false}
              onChange={(e) => {
                setIsChecked(!isChecked);
                onChange && onChange(e);
                field.onChange(e);
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
