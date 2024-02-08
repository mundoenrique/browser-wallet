'use client';
import { Box, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useQRCode } from 'next-qrcode';
import { ModalResponsive } from '@/components';

export default function Card() {
  const { SVG } = useQRCode();

  const [showModal, setShowModal] = useState(true);

  const userData = JSON.stringify({ username: 'elazaro', password: 'lazaro123' });

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
        </Grid>
      </ModalResponsive>
    </>
  );
}
