'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Typography, Box } from '@mui/material';
// Internal app
import { api } from '@/utils/api';
import { ModalResponsive } from '.';
import { TIME_SESSION_CLIENT } from '@/utils/constants';
import { setDataRedis, validateTime } from '@/utils/toolHelper';
import { useAccessSessionStore, useKeyStore, useUserStore } from '@/store';

export default function TimmerSession() {
  const { push } = useRouter();

  const user = useUserStore((state) => state.user);

  const jwePublicKey = useKeyStore((state) => state.jwePublicKey);

  const setAccessSession = useAccessSessionStore((state) => state.setAccessSession);

  const [open, setOpen] = useState<boolean>(false);

  const closeSession = async () => {
    localStorage.removeItem('sessionTime');
    await api.delete('/redis', { data: { jwePublicKey, delParam: 'timeSession' } });
    await api.delete('/redis', { data: { key: 'activeSession', jwePublicKey, delParam: user.userId } });
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

      const timeRest: number = validateTime(TIME_SESSION_CLIENT, localStorage.sessionTime);

      if (timeRest === 25) {
        setOpen(true);
      } else if (timeRest <= 0 || isNaN(timeRest)) {
        clearInterval(intervalSession);
        closeSession();
      }
    };

    const intervalSession = setInterval(timerSession, 1000);
    localStorage.setItem('intervalId', intervalSession.toString());

    return () => clearInterval(intervalSession);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
