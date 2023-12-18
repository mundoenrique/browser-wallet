'use client';

import { useEffect, useState } from 'react';
import { isIOS } from 'react-device-detect';

import { Button, Slide, Stack, Paper, Typography } from '@mui/material';
//Internal app

export default function PWAInstallBar() {
  const [deferredPrompt, setDeferredPrompt] = useState<string | Event | null | any>(null);
  const [iOSDevice, setIOSDevice] = useState<boolean>(false);
  const [openBar, setOpenBar] = useState<boolean>(false);

  useEffect(() => {
    setIOSDevice(isIOS);

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      console.log('install', e);
      setOpenBar(true);
    });
    if (iOSDevice && !(window as any).navigator.standalone) {
      setOpenBar(true);
    }
  }, [iOSDevice]);

  const intallPrompt = async () => {
    if (!deferredPrompt) {
      return;
    }
    await deferredPrompt.prompt();
    setDeferredPrompt(null);
    setOpenBar(false);
  };

  const toggleCloseBar = () => {
    setOpenBar(false);
  };

  return (
    <>
      <Slide mountOnEnter unmountOnExit direction="up" in={openBar}>
        <Paper
          elevation={0}
          square
          variant="outlined"
          sx={{
            bottom: 0,
            position: 'absolute',
            height: 80,
            zIndex: 99999,
            width: '100%',
            display: 'flex',
            paddingX: '8px',
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              width: '100%',
            }}
          >
            {iOSDevice ? (
              <>
                <Typography>Instalar</Typography>
                <Button size="large" onClick={toggleCloseBar} color="inherit">
                  X
                </Button>
              </>
            ) : (
              <>
                <Button variant="contained" onClick={intallPrompt}>
                  Instalar
                </Button>

                <Button size="large" onClick={toggleCloseBar} color="inherit">
                  X
                </Button>
              </>
            )}
          </Stack>
        </Paper>
      </Slide>
    </>
  );
}
