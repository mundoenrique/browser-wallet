'use client';

import { useState } from 'react';
import { Controller } from 'react-hook-form';
import Info from '@mui/icons-material/InfoOutlined';
import { FormControl, FormHelperText, Checkbox, FormControlLabel, FormGroup, Box, Typography } from '@mui/material';
//Internal App
import { InputCheckProps } from '@/interfaces';

function InputCheckMUI(props: InputCheckProps): JSX.Element {
  const { name, label, labelError, onChange, checked, value, error, disabled, ...restProps } = props;

  const textLabel = label ?? name;

  return (
    <FormControl component="fieldset" variant="standard" fullWidth>
      <FormGroup>
        <FormControlLabel
          value={value}
          disabled={disabled}
          checked
          control={<Checkbox id={name} checked={checked} onChange={onChange} />}
          label={label}
          sx={{ alignItems: 'flex-start', '&>.MuiFormControlLabel-label': { fontSize: '14px' } }}
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
  const { name, control, onChange, onClick, checked, labelHandle, ...restProps } = props;
  const [isChecked, setIsChecked] = useState(checked ? true : false);

  return (
    <>
      {control ? (
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) =>
            !labelHandle ? (
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
                {...restProps}
              />
            ) : (
              <Box sx={{ display: 'flex', alignContent: 'center' }}>
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
                  {...restProps}
                />
                <Typography
                  onClick={onClick}
                  sx={{
                    fontSize: '14px',
                    textDecoration: 'underline',
                    position: 'absolute',
                    ml: '31px',
                    cursor: 'pointer',
                  }}
                >
                  {labelHandle}
                </Typography>
              </Box>
            )
          }
        />
      ) : (
        <InputCheckMUI name={name} onChange={onChange} onClick={onClick} {...restProps} />
      )}
    </>
  );
}
