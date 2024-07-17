'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Typography, Box } from '@mui/material';
// Internal app
import { ModalResponsive } from '.';
import { useAccessSessionStore } from '@/store';
import { setDataRedis, validateTime } from '@/utils/toolHelper';

export default function TimmerSession() {
  const { push } = useRouter();

  const setAccessSession = useAccessSessionStore((state) => state.setAccessSession);

  const [open, setOpen] = useState<boolean>(false);

  const closeSession = async () => {
    localStorage.removeItem('sessionTime');
    await setDataRedis('DELETE', { data: { delParam: 'timeSession' } });
    setAccessSession(false);
    push('/signin');
  };

  const resetSession = async () => {
    const date = new Date();
    localStorage.setItem('sessionTime', date.toString());
    const stateObject = { timeSession: date.toString() };
    await setDataRedis('PUT', { uuid: null, data: stateObject });
    setOpen(false);
  };

  useEffect(() => {
    const timerSession = () => {
      if (!localStorage.sessionTime) {
        closeSession();
      }

      const timeRest: number = validateTime(180, localStorage.sessionTime);

      if (timeRest === 25) {
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
    <ModalResponsive open={open} handleClose={closeSession}>
      <Box>
        <Typography variant="subtitle1" mb={3}>
          Tu sesión está a punto de expirar. Desea seguir utilizando su App?
        </Typography>
        <Button variant="contained" onClick={resetSession} sx={{ width: '100%', mx: 'auto' }}>
          Continuar
        </Button>
      </Box>
    </ModalResponsive>
  );
}
