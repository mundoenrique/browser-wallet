'use client';

import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import Info from '@mui/icons-material/InfoOutlined';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { Box, Button, FormHelperText, Typography } from '@mui/material';
//Internal app
import { InputOTPProps } from '@/interfaces';
import ModalResponsive from '../modal/ModalResponsive';

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
                  gap: '12px',
                  '&>.MuiFormControl-root>.MuiInputBase-root': { width: '46px', fontSize: '25px', fontWeight: 700 },
                }}
                {...field}
                length={length}
              />
              <FormHelperText
                sx={{
                  height: '20px',
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

        <Button
          onClick={handleResend}
          sx={{ color: 'primary.main', height: '20px' }}
          disabled={time === 0 ? false : true}
        >
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
