'use client';

import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useQRCode } from 'next-qrcode';
import { MainLayout, ModalResponsive } from '@/components';

import io from 'socket.io-client';
let socket: any;

export default function Card() {
  const { SVG } = useQRCode();
  // const [apiData, setApiData] = useState<any>(null);
  const [dataUser, setDataUser] = useState<any>(null);
  const [showModal, setShowModal] = useState(true);
  const [url, setUrl] = useState('https://g868630t-3000.brs.devtunnels.ms/qr');

  // useEffect(() => socketInitializer(), []);

  // const socketInitializer = async () => {
  //   await fetch('/api/socket');

  //   socket.on('connect', () => {
  //     console.log('connected');
  //   });

  //   socket.on('infoUser', (data: any) => {
  //     console.log('pageCard - Mensaje del servidor:', data);
  //     setDataUser(data);
  //     setShowModal(true);
  //   });
  // };

  useEffect(() => {
    const socketInit = async () => {
      await fetch('/api/socket');
      socket = io('', {
        path: '/api/my_socket',
      });

      socket.on('connect', () => {
        console.log('Connected', socket.id);
      });

      socket.on('infoUser', (data: any) => {
        console.log('pageCard - Mensaje del servidor:', data);
        setDataUser(data);
        setShowModal(false);
      });
    };
    socketInit();
  }, []);

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
              Validar información
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
              text={url}
              options={{
                margin: 2,
                width: 200,
              }}
            />
          </Grid>
        </Grid>
      </ModalResponsive>
      <div>
        <h1>Next.js con Socket.IO </h1>
        {/* {apiData && (
          <div>
            <h2>Últimos movimientos:</h2>
            <ul>
              {apiData.map((movement: any) => (
                <li key={movement.id}>{movement.description}</li>
              ))}
            </ul>
          </div>
        )} */}
        {dataUser && (
          <div>
            <h2>Mensaje del servidor:</h2>
            <p>{dataUser}</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
