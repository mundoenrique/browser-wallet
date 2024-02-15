'use client';

import { useState } from 'react';
import { Controller } from 'react-hook-form';
import Info from '@mui/icons-material/InfoOutlined';
import Visibility from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOff from '@mui/icons-material/VisibilityOffOutlined';
import { FormControl, FormHelperText, InputAdornment, InputLabel, OutlinedInput, IconButton } from '@mui/material';
//Internal App
import { TextFieldProps } from '@/interfaces';

export default function InputPass(props: TextFieldProps): JSX.Element {
  const { name, control, label, labelError, onChange, colorText, disabled, readOnly } = props;

  const [passwordShown, setPasswordShown] = useState(false);
  const inputLabel = label ?? name;

  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <InputLabel htmlFor={name} sx={{ mb: 3 / 2, color: colorText ? colorText : 'inherit' }}>
              {inputLabel}
            </InputLabel>
            <FormControl fullWidth variant="outlined" error={!!error} sx={{ mb: '5px' }}>
              <OutlinedInput
                id={name}
                type={passwordShown ? 'text' : 'password'}
                label={inputLabel}
                aria-describedby={`${name}-helperText`}
                value={field.value}
                disabled={disabled}
                readOnly={readOnly}
                onChange={(e) => {
                  field.onChange(e);
                  onChange && onChange(e);
                }}
                error={!!error}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={togglePasswordVisiblity} edge="end">
                      {passwordShown ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText
                sx={{
                  height: 20,
                  ml: 0,
                  display: 'flex',
                  alignItems: 'center',
                  color: colorText ? `${colorText} !important` : 'inherit',
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
        )}
      />
    </>
  );
}
