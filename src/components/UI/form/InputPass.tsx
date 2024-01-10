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

const passwordStrength = {
  '0': 'Debe contener mínimo 8 caracteres.',
  '1': 'Tener al menos una mayúscula.',
  '2': 'Contener un carácter especial (!#$%&).',
};

export default function InputPassField(props: TextFieldProps): JSX.Element {
  const { name, control, label, labelError, onChange, additionalInfo = false } = props;

  const [passwordShown, setPasswordShown] = useState(false);
  const [openPopper, setOpenPopper] = useState(false);
  const [arrowRef, setArrowRef] = useState<any>(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const inputLabel = label ?? name;

  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };

  const handleClickPopper = () => {
    setOpenPopper(true);
    return null;
  };

  function PassStrength(props: any) {
    return (
      <Fade in={openPopper} timeout={450}>
        <Box
          sx={{
            backgroundColor: 'white',
            borderRadius: 1,
            boxShadow: 3,
            m: 1,
            p: 2,
          }}
        >
          {Object.entries(props.object).map(([key, value]: any) => (
            <Typography key={key} component="li">
              {value}
            </Typography>
          ))}
        </Box>
      </Fade>
    );
  }

  const handleClickAway = () => {
    setOpenPopper(false);
  };

  return (
    <>
      <ClickAwayListener onClickAway={handleClickAway}>
        <Box onClick={handleClickPopper} ref={setAnchorEl}>
          <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <FormControl fullWidth variant="outlined" error={!!error} sx={{ mb: 2 }}>
                <InputLabel htmlFor={name}>{inputLabel}</InputLabel>
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
            )}
          />

          {additionalInfo && (
            <Popper
              open={openPopper}
              anchorEl={anchorEl}
              placement="right-end"
              disablePortal={false}
              sx={{ zIndex: 'fab' }}
              modifiers={[
                {
                  name: 'flip',
                  enabled: true,
                  options: {
                    altBoundary: true,
                    rootBoundary: 'document',
                    fallbackPlacements: ['top', 'right-end'],
                  },
                },
                {
                  name: 'preventOverflow',
                  enabled: true,
                  options: {
                    altAxis: true,
                    altBoundary: true,
                    tether: true,
                    rootBoundary: 'document',
                  },
                },
                {
                  name: 'arrow',
                  enabled: false,
                  options: {
                    element: arrowRef,
                  },
                },
              ]}
            >
              <Typography variant="h3" component="span" ref={setArrowRef} />

              <PassStrength object={passwordStrength} />
            </Popper>
          )}
        </Box>
      </ClickAwayListener>
    </>
  );
}
