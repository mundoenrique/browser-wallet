'use client';

import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import Info from '@mui/icons-material/InfoOutlined';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { Box, Button, FormHelperText, Typography } from '@mui/material';
//Internal app
import { InputOTPProps } from '@/interfaces';
import ModalResponsive from '../modal/ModalResponsive';

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
export default function InputOTP(props: InputOTPProps): JSX.Element {
  const { control, name, length, title, text, labelError } = props;
  const [time, setTime] = useState<number>(60);
  const [open, setOpen] = useState(false);

  const handleResend = () => {
    setTime(60);
    setOpen(!open);
    console.log();
  };

  useEffect(() => {
    const updateTimer = () => {
      setTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          return 0;
        }
      });
    };

    const timerId = setInterval(updateTimer, 1000);

    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setOpen(false);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [open]);

  return (
    <>
      <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Typography fontWeight={700} mb={3}>
          {title}
        </Typography>
        <Typography variant="body2" mb="12px">
          {text}
        </Typography>
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
                  <>{labelError || ''}</>
                )}
              </FormHelperText>
            </Box>
          )}
        />
        {time === 0 ? (
          <Typography variant="body2" mb={5}>
            De necesitarlo, ya puedes solicitar un nuevo código
          </Typography>
        ) : (
          <Typography variant="body2" mb={5} color="primary.main">
            Tiempo restante - 0:{time}
          </Typography>
        )}

        <Button onClick={handleResend} sx={{ color: 'primary.main', height: 20 }} disabled={time === 0 ? false : true}>
          Renviar código
        </Button>
      </Box>

      <ModalResponsive open={open} handleClose={() => setOpen(false)}>
        <Typography py={2} fontWeight={700}>
          🎰 Nuevo código enviado
        </Typography>
      </ModalResponsive>
    </>
  );
}
