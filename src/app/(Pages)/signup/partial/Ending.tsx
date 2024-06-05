'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Box, Typography, Zoom } from '@mui/material';
//Internal app
import LogoGreen from '%/images/LogoGreen';
import { useRegisterStore } from '@/store';
import { PurpleLayout } from '@/components';
import animation1 from '%/images/animation1.svg';
import animation2 from '%/images/animation2.svg';
import { fuchsiaBlue } from '@/theme/theme-default';

export default function Ending() {
  const { setShowHeader } = useRegisterStore();
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const { replace } = useRouter();

  useEffect(() => {
    let timer = setInterval(() => {});
    if (currentImageIndex < 3) {
      timer = setInterval(() => {
        setCurrentImageIndex((prevIndex) => prevIndex + 1);
      }, 3000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [currentImageIndex]);

  const timeEvent = (time: number) =>
    new Promise((resolve) => {
      setTimeout(() => resolve(true), time);
    });

  useEffect(() => {
    setShowHeader(false);
    (async () => {
      timeEvent(4000)
        .then(() => {
          return timeEvent(1500);
        })
        .then(() => {
          replace('/signin');
          sessionStorage.removeItem('app-store');
        });
    })();
  }, [setShowHeader, replace]);

  return (
    <PurpleLayout bigModal>
      {currentImageIndex < 2 && (
        <Box sx={{ zIndex: 1, display: 'grid', justifyContent: 'center' }}>
          {currentImageIndex === 0 && (
            <Box mb={3}>
              <Image src={animation1} width={360} height={345} alt={`Animation Yiro ${currentImageIndex}`} priority />
            </Box>
          )}
          {currentImageIndex === 1 && (
            <Zoom in={true}>
              <Image src={animation2} width={360} height={345} alt={`Animation Yiro ${currentImageIndex}`} priority />
            </Zoom>
          )}
        </Box>
      )}
      {currentImageIndex === 1 && (
        <Zoom in={true}>
          <Typography
            sx={{
              color: fuchsiaBlue[200],
              mb: { xs: 7, sm: 3 },
              fontSize: 28,
              fontWeight: 700,
              textAlign: 'center',
            }}
          >
            ¡Felicidades! <br /> Ya eres parte de <br /> Yiro
          </Typography>
        </Zoom>
      )}
      {currentImageIndex >= 2 && (
        <Zoom in={true} timeout={1000}>
          <Box>
            <LogoGreen />
          </Box>
        </Zoom>
      )}
    </PurpleLayout>
  );
}
