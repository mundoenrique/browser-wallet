'use client';

import { useState } from 'react';
import { Controller } from 'react-hook-form';
import Info from '@mui/icons-material/InfoOutlined';
import Visibility from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOff from '@mui/icons-material/VisibilityOffOutlined';
import { FormControl, FormHelperText, InputAdornment, InputLabel, OutlinedInput, IconButton } from '@mui/material';
//Internal App
import { TextFieldProps } from '@/interfaces';

/**
 * Field used to display or not display a password.
 *
 * @param name - Name of the field - React Hook Form.
 * @param control - Object provided by the useForm method - React Hook Form.
 * @param label - The label of the input.
 * @param labelError - Text for error message.
 * @param onChange - Detect the change in the input.
 * @param colorText - Input label color.
 * @param disabled - Disable input.
 * @param readOnly - Make the input read-only.
 * @returns The value assigned to the input.
 * @throws If there is an error in any field that does not comply with the regular expressions.
 * @label React Hook Form - {@link https://react-hook-form.com/docs/useform/control}
 * @label Material UI - {@link https://mui.com/material-ui/api/outlined-input/}
 */
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
