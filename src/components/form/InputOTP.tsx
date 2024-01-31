'use client';

import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { Box, Button, Typography } from '@mui/material';
import { MuiOtpInput } from 'mui-one-time-password-input';
//Internal app
import { InputOTPProps } from '@/interfaces';
import ModalResponsive from '../modal/ModalResponsive';

export default function InputOTP(props: InputOTPProps): JSX.Element {
  const { control, name, length, title, text } = props;
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
          render={({ field }: any) => (
            <Box>
              <MuiOtpInput
                sx={{
                  gap: 1,
                  mb: 3,
                  '&>.MuiFormControl-root>.MuiInputBase-root': { width: '46px', fontSize: '25px', fontWeight: 700 },
                }}
                {...field}
                length={length}
              />
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

        <Button onClick={handleResend} sx={{ color: 'primary.main' }} disabled={time === 0 ? false : true}>
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
