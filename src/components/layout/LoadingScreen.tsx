'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isMobile } from 'react-device-detect';
import { sendGTMEvent } from '@next/third-parties/google';
import { Backdrop, CircularProgress, Typography, Box, Zoom } from '@mui/material';
//Internal app
import yiro from '%/images/arts/yiro.png';
import LogoGreen from '%/images/LogoGreen';
import { PurpleLayout } from '@/components';
import animation2 from '%/images/animation2.svg';
import { fuchsiaBlue } from '@/theme/theme-default';
import { useHeadersStore, useRegisterStore, useUiStore } from '@/store';

export default function LoadingScreen() {
  const loadingScreen = useUiStore((state) => state.loadingScreen);
  const loadingScreenOptions = useUiStore((state) => state.loadingScreenOptions);

  return (
    <Backdrop open={loadingScreen} sx={{ color: '#fff', zIndex: 2001 }}>
      <CircularProgress color="inherit" />
      {Object.hasOwn(loadingScreenOptions, 'message') && <ModalLogo message={loadingScreenOptions.message} />}
      {Object.hasOwn(loadingScreenOptions, 'animations') && <AnimationLogo />}
    </Backdrop>
  );
}

const ModalLogo = ({ message }: any) => {
  return (
    <PurpleLayout bigModal>
      <Box sx={{ zIndex: 1, display: 'grid', justifyItems: 'center' }}>
        {isMobile ? <Image src={yiro} alt="Yiro logo" width={132} height={74} /> : <LogoGreen />}
        <Typography variant="h6" color="white" align="center" width={222}>
          {message}
        </Typography>
      </Box>
    </PurpleLayout>
  );
};

const AnimationLogo = () => {
  const { replace } = useRouter();

  const { setShowHeader } = useRegisterStore();

  const host = useHeadersStore((state) => state.host);

  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  useEffect(() => {
    sendGTMEvent({
      event: 'ga4.trackEvent',
      eventName: 'page_view_ga4',
      eventParams: {
        page_location: `${host}/signup`,
        page_title: 'Yiro :: onboarding :: finalStep',
        page_referrer: `${host}/identify`,
        section: 'Yiro :: onboarding :: finalStep',
        previous_section: 'Yiro :: onboarding :: step4 :: createPassword',
      },
    });
  }, [host]);

  useEffect(() => {
    let timer = setInterval(() => {});
    if (currentImageIndex < 2) {
      timer = setInterval(() => {
        setCurrentImageIndex((prevIndex: number) => prevIndex + 1);
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
      timeEvent(6000)
        .then(() => {
          return timeEvent(2000);
        })
        .then(() => {
          replace('/signin');
        });
    })();
  }, [setShowHeader, replace]);

  return (
    <PurpleLayout bigModal>
      {currentImageIndex < 2 && (
        <Box sx={{ zIndex: 1, display: 'grid', justifyContent: 'center' }}>
          {currentImageIndex === 0 && (
            <Zoom in={true}>
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Image src={animation2} width={360} height={345} alt={`Animation Yiro ${currentImageIndex}`} priority />
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
              </Box>
            </Zoom>
          )}
        </Box>
      )}
      {currentImageIndex >= 1 && (
        <Zoom in={true} timeout={1000}>
          <Box>
            <LogoGreen />
          </Box>
        </Zoom>
      )}
    </PurpleLayout>
  );
};
