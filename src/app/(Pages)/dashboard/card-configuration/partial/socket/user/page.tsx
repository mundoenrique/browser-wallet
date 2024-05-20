'use client';

import { useState } from 'react';
import io from 'socket.io-client';
import { useQRCode } from 'next-qrcode';
import { Button, Grid, Typography } from '@mui/material';
//Internal app
import { MainLayout, ModalResponsive } from '@/components';

let socket: any;

export default function Card() {
  const { SVG } = useQRCode();
  const [showModal, setShowModal] = useState<boolean>(true);
  const userData = JSON.stringify({ username: 'elazaro', password: 'lazaro123' });

  const handleSocketEmit = async () => {
    await fetch('/api/socket');
    socket = io('', {
      path: '/api/my_socket',
    });
    socket.emit('sendData', userData);
    setShowModal(false);
  };

  return (
    <MainLayout>
      <ModalResponsive open={showModal} handleClose={() => setShowModal(false)}>
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="subtitle1" mb="12px">
              Usuario validar datos
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <SVG
              text={userData}
              options={{
                margin: 2,
                width: 200,
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Button variant="primary" onClick={handleSocketEmit}>
              Emitir
            </Button>
          </Grid>
        </Grid>
      </ModalResponsive>
    </MainLayout>
  );
}
