'use client';

import { useState } from 'react';
import { Controller } from 'react-hook-form';
import Info from '@mui/icons-material/InfoOutlined';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { Box, Button, FormHelperText, Snackbar, Typography, useTheme, useMediaQuery } from '@mui/material';
//Internal app
import { InputOTPProps } from '@/interfaces';
import { formatTime } from '@/utils/toolHelper';
/**
 * Field used to enter an otp code.
 *
 * @param name - Name of the field - React Hook Form.
 * @param control - Object provided by the useForm method - React Hook Form.
 * @param length - Number of otp fields.
 * @param title - Title of the form.
 * @param text - Descriptive paragraph of the form.
 * @param labelError - Text for error message.
 * @returns The value assigned to the Otp.
 * @throws If there is an error in any field that does not comply with the regular expressions.
 * @label React Hook Form - {@link https://react-hook-form.com/docs/useform/control}
 * @label MUI Otp input - {@link https://viclafouch.github.io/mui-otp-input/}
 */
export default function InputOTP(props: Readonly<InputOTPProps>): JSX.Element {
  const { control, name, length, title, text, labelError, handleResendOTP, timeLeft, setTime } = props;

  const [open, setOpen] = useState(false);

  const theme = useTheme();

  const match = useMediaQuery(theme.breakpoints.down('sm'));

  const handleResend = () => {
    handleResendOTP();
    setTime(60);
    setOpen(!open);
  };

  return (
    <>
      <Typography fontWeight={700} mb={3}>
        {title}
      </Typography>
      <Typography variant="body2" mb="12px">
        {text}
      </Typography>
      <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Controller
          name={name}
          control={control}
          rules={{ validate: (value: any) => value.length === length }}
          render={({ field, fieldState: { error } }: any) => (
            <Box>
              <MuiOtpInput
                sx={{
                  p: 0,
                  gap: 3 / 2,
                  '&>.MuiFormControl-root>.MuiInputBase-root': { width: '46px', fontSize: 25, fontWeight: 700 },
                }}
                {...field}
                length={length}
              />
              <FormHelperText
                sx={{
                  height: 20,
                  ml: 0,
                  display: 'flex',
                  alignItems: 'center',
                }}
                id={`${name}-helperText`}
                error
              >
                {error ? (
                  <>
                    <Info fontSize="small" sx={{ mr: 1 }} /> {error.message}
                  </>
                ) : (
                  <>{labelError ?? ''}</>
                )}
              </FormHelperText>
            </Box>
          )}
        />

        <Typography variant="body2" mb={5} color="primary.main">
          Tiempo restante - {formatTime(timeLeft)}
        </Typography>

        <Button onClick={handleResend} sx={{ color: 'primary.main', height: 20 }} disabled={timeLeft !== 0}>
          Reenviar código
        </Button>
      </Box>

      <Snackbar
        sx={{ '&>.MuiPaper-root': { bgcolor: 'white', borderRadius: '4px', color: 'initial', boxShadow: 2 } }}
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: match ? 'top' : 'bottom', horizontal: 'center' }}
        message="🎰 Nuevo código enviado"
      />
    </>
  );
}
