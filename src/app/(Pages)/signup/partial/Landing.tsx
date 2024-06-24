'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { sendGTMEvent } from '@next/third-parties/google';
import { Button, Box, Typography, Zoom } from '@mui/material';
//Internal app
import LogoPurple from '%/images/LogoPurple';
import { fuchsiaBlue } from '@/theme/theme-default';
import animation1 from '%/images/pwa/animation1.png';
import animation2 from '%/images/pwa/animation2.png';
import animation3 from '%/images/pwa/animation3.png';
import { useHeadersStore, useRegisterStore } from '@/store';

const animationState = [
  {
    src: animation1,
    text: (
      <>
        Yiro, tu billetera <br /> electrónica
      </>
    ),
  },
  {
    src: animation2,
    text: (
      <>
        ¡Paga y cobra fácil <br /> con Yiro!
      </>
    ),
  },
  {
    src: animation3,
    text: (
      <>
        Organiza tus <br /> finanzas y tu negocio
      </>
    ),
  },
];

export default function Landing() {
  const { host } = useHeadersStore();

  const { inc, setShowHeader } = useRegisterStore();

  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  useEffect(() => {
    let timer = setInterval(() => {});
    if (currentImageIndex < 2) {
      timer = setInterval(() => {
        setCurrentImageIndex((prevIndex) => prevIndex + 1);
      }, 3000);
    }

    return () => {
      clearInterval(timer);
    };
  });

  useEffect(() => {
    sendGTMEvent({
      event: 'ga4.trackEvent',
      eventName: 'page_view_ga4',
      eventParams: {
        page_location: `${host}/signup`,
        page_title: 'Yiro :: onboarding :: step0',
        page_referrer: `${host}/identify`,
        section: 'Yiro :: onboarding :: step0',
        previous_section: 'identify',
      },
    });
  }, [host]);

  useEffect(() => {
    setShowHeader(true);
  }, [setShowHeader]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 'auto',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ display: { sm: 'none' } }}>
          <LogoPurple width={71} height={40} />
        </Box>
        <Zoom in={true}>
          <Box>
            <Image src={animationState[currentImageIndex].src} width={360} height={223} alt="animation" priority />
            <Typography
              sx={{
                color: fuchsiaBlue[800],
                mb: { xs: 7, sm: 3 },
                fontSize: 28,
                fontWeight: 700,
                textAlign: 'center',
              }}
            >
              {animationState[currentImageIndex].text}
            </Typography>
          </Box>
        </Zoom>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="subtitle1" sx={{ color: fuchsiaBlue[800], mb: { xs: 7, sm: 3 } }}>
          ¡Obtén tu cuenta Yiro en sólo 4 pasos!
        </Typography>
        <Button
          variant="contained"
          sx={{ width: 320 }}
          onClick={() => {
            inc();
            sendGTMEvent({
              event: 'ga4.trackEvent',
              eventName: 'select_content',
              eventParams: {
                content_type: 'boton',
                section: 'Yiro :: onboarding :: step0',
                previous_section: 'identify',
                selected_content: '¡Inicia YA!',
                destination_page: `${host}/signup`,
              },
            });
          }}
        >
          ¡Inicia YA!
        </Button>
      </Box>
    </Box>
  );
}
