'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { sendGTMEvent } from '@next/third-parties/google';
import { Button, Box, Typography, Zoom } from '@mui/material';
//Internal app
import { api } from '@/utils/api';
import ErrorPage from './ErrorPage';
import LogoPurple from '%/images/LogoPurple';
import { encryptForge } from '@/utils/toolHelper';
import { fuchsiaBlue } from '@/theme/theme-default';
import animation1 from '%/images/animation1.png';
import animation2 from '%/images/animation2.png';
import animation3 from '%/images/animation3.png';
import { useHeadersStore, useJwtStore, useRegisterStore, useUiStore } from '@/store';

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
  const inc = useRegisterStore((state) => state.inc);

  const host = useHeadersStore((state) => state.host);

  const identifier = useJwtStore((state) => state.uuid);

  const phaseInfo = useRegisterStore((state) => state.ONB_PHASES_TERMS);

  const setShowHeader = useRegisterStore((state) => state.setShowHeader);

  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const [error, setError] = useState<boolean>(false);

  const setLoadingScreen = useUiStore((state) => state.setLoadingScreen);

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

  const verifyUser = async () => {
    setLoadingScreen(true);
    const { consultant } = phaseInfo as any;

    const shortDoc =
      consultant.documentType === 'DNI' ? consultant.documentNumber.slice(-8) : consultant.documentNumber;

    const documentPayload = {
      documentType: encryptForge(consultant.documentType),
      documentNumber: encryptForge(shortDoc),
    };

    const blacklistPayload = {
      names: encryptForge(`${consultant.firstName} ${consultant.middleName}`),
      lastNames: encryptForge(`${consultant.firstLastName} ${consultant.secondLastName}`),
      documentNumber: encryptForge(shortDoc),
      documentType: encryptForge(consultant.documentType),
      identifier,
    };

    const blacklist = api.post('/onboarding/blacklist', blacklistPayload);

    const documentValidation = api.post('/onboarding/documents/validate', documentPayload);

    Promise.all([blacklist, documentValidation])
      .then((responses: any) => {
        const [blackListResponse, docVerificationResponse] = responses;

        const isSuccessCodeBlack = (response: any) => response?.data?.code === '200.00.343';
        const isSuccessCode = (response: any) => response?.data?.code === '200.00.000';

        if (isSuccessCodeBlack(blackListResponse) && isSuccessCode(docVerificationResponse)) {
          inc();
        }
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoadingScreen(false);
      });
  };

  useEffect(() => {
    sendGTMEvent({
      event: 'ga4.trackEvent',
      eventName: 'page_view_ga4',
      eventParams: {
        page_location: `${host}/signup/onboarding/step0`,
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

  if (error) {
    return <ErrorPage />;
  }

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
            verifyUser();
            sendGTMEvent({
              event: 'ga4.trackEvent',
              eventName: 'select_content',
              eventParams: {
                content_type: 'boton',
                section: 'Yiro :: onboarding :: step0',
                previous_section: 'identify',
                selected_content: '¡Inicia YA!',
                destination_page: `${host}/signup/onboarding/step1`,
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
