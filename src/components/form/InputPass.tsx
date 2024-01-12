'use client';

import { useState } from 'react';
import { Controller } from 'react-hook-form';
import {
  Box,
  ClickAwayListener,
  Fade,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Popper,
  Typography,
  IconButton,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
//Internal App
import { TextFieldProps } from '@/interfaces';

export default function InputPassField(props: TextFieldProps): JSX.Element {
  const { name, control, label, labelError, onChange } = props;

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
            <InputLabel sx={{ mb: '12px' }}>{inputLabel}</InputLabel>
            <FormControl fullWidth variant="outlined" error={!!error} sx={{ mb: '5px' }}>
              <OutlinedInput
                id={name}
                type={passwordShown ? 'text' : 'password'}
                label={inputLabel}
                aria-describedby={`${name}-helperText`}
                value={field.value}
                onChange={(e) => {
                  field.onChange(e);
                  onChange && onChange(e);
                }}
                error={!!error}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={togglePasswordVisiblity} edge="end">
                      {passwordShown ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText sx={{ height: '20px' }} id={`${name}-helperText`}>
                {error ? error.message : labelError || ''}
              </FormHelperText>
            </FormControl>
          </>
        )}
      />
    </>
  );
}
