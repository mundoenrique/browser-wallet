import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { Box, Button, Typography } from '@mui/material';
//Internal app
import { InputOTPProps } from '@/interfaces';
import ModalResponsive from '../modal/ModalResponsive';

export default function InputOTP(props: InputOTPProps): JSX.Element {
  const { control, name, length, title, text } = props;
  const [time, setTime] = useState<number>(60);
  const [open, setOpen] = useState(true);

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
        <Typography mb="12px">{text}</Typography>
        <Controller
          name={name}
          control={control}
          rules={{ validate: (value) => value.length === length }}
          render={({ field }) => (
            <Box>
              <MuiOtpInput
                sx={{ gap: 1, '&>.MuiFormControl-root>.MuiInputBase-root': { width: '46px' }, mb: 3 }}
                {...field}
                length={length}
              />
            </Box>
          )}
        />
        {time === 0 ? (
          <Typography mb={5}>Ya puedes solicitar un nuevo código</Typography>
        ) : (
          <Typography mb={5}>Tiempo restante - 0:{time}</Typography>
        )}

        <Button onClick={handleResend} sx={{ color: 'primary.main' }} disabled={time === 0 ? false : true}>
          Renviar código
        </Button>
      </Box>

      <ModalResponsive open={open} handleClose={() => setOpen(false)}>
        <Typography>🎰 Nuevo código enviado</Typography>
      </ModalResponsive>
    </>
  );
}
