'use client';

import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
// Internal app
import { ModalResponsive } from '.';
import { Box } from '@mui/system';
import { useRouter } from 'next/navigation';
import { useAccessSessionStore } from '@/store';

export default function TimmerSession() {

  const setAccessSession = useAccessSessionStore((state) => state.setAccessSession);

  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const closeSession = () => {
    setAccessSession(false)
    localStorage.removeItem('sessionTime');
    router.push('/signin');
  };

  const resetSession = () => {
    const date = new Date();
    localStorage.setItem('sessionTime', date.toString());
    setOpen(false);
  };

  useEffect(() => {
    const timerSession = () => {
      if (!localStorage.sessionTime) {
        closeSession();
      }

      const date = new Date(localStorage.sessionTime).getTime();
      const now = new Date().getTime();
      const time: number = Math.trunc(Math.abs((date - now) / 1000));
      const timeRest: number = parseInt(process.env.NEXT_PUBLIC_SESS_EXPIRATION || '60') - time;
      if (timeRest === 45) {
        setOpen(true);
      } else if (timeRest <= 0 || isNaN(timeRest)) {
        clearInterval(intervalSession);
        closeSession();
      }
    };

    const intervalSession = setInterval(timerSession, 1000);

    return () => clearInterval(intervalSession);
  }, []);

  return (
    <>
      <ModalResponsive open={open} handleClose={closeSession}>
        <Box component="form" autoComplete="off">
          <Typography variant="subtitle1" mb="12px">
            Tu sesión está a punto de expirar. Desea seguir utilizando su App?
          </Typography>
          <Button
            variant="contained"
            type="button"
            onClick={resetSession}
          >
            Continuar
          </Button>

        </Box>
      </ModalResponsive>
    </>
  );
}
