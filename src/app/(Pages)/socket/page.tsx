'use client';

import io from 'socket.io-client';
import { useQRCode } from 'next-qrcode';
import { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
//Internal app
import { MainLayout, ModalResponsive } from '@/components';

let socket: any;

export default function Card() {
  const { SVG } = useQRCode();
  const [dataUser, setDataUser] = useState<any>(null);
  const [showModal, setShowModal] = useState<boolean>(true);
  const [url] = useState<string>(`${process.env.NEXT_PUBLIC_PATH_URL}/qr`);

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
        setDataUser(data);
        setShowModal(false);
        socket.emit('disconnect');
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
