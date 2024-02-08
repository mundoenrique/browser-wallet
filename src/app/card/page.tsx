'use client';
import { Box, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useQRCode } from 'next-qrcode';
import { ModalResponsive } from '@/components';

let socket: any;

export default function Card() {
  const { SVG } = useQRCode();

  const [showModal, setShowModal] = useState(true);
  const [url, setUrl] = useState('https://g868630t-3000.brs.devtunnels.ms/novo/qr');

  return (
    <>
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
    </>
  );
}
