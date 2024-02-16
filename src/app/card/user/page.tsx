/**
 * User information page.
 *
 * @description Page simulates the card information to be validated.
 * @param {function} handleSocketEmit - Test event for broadcasting through a button
 * @returns {JSX.Element} The rendered page.
 */

'use client';
import { Box, Button, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useQRCode } from 'next-qrcode';
import { MainLayout, ModalResponsive } from '@/components';
import io from 'socket.io-client';

let socket: any;

export default function Card() {
  const { SVG } = useQRCode();

  const [showModal, setShowModal] = useState(true);

  const userData = JSON.stringify({ username: 'elazaro', password: 'lazaro123' });

  const handleSocketEmit = async () => {
    await fetch('/api/socket');
    socket = io('', {
      path: '/api/my_socket',
    });
    console.log('Emitiendo datos al servidor:', userData);
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
