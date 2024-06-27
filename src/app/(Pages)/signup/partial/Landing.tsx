'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button, Box, Typography, Zoom } from '@mui/material';
//Internal app
import { api } from '@/utils/api';
import { useRegisterStore } from '@/store';
import { encryptForge } from '@/utils/toolHelper';
import LogoPurple from '%/images/LogoPurple';
import { fuchsiaBlue } from '@/theme/theme-default';
import animation1 from '%/images/pwa/animation1.png';
import animation2 from '%/images/pwa/animation2.png';
import animation3 from '%/images/pwa/animation3.png';
import ErrorPage from './ErrorPage';

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
  const setShowHeader = useRegisterStore((state) => state.setShowHeader);
  const phaseInfo = useRegisterStore((state) => state.ONB_PHASES_TERMS);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const [error, setError] = useState<boolean>(false);

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
    const { consultant } = phaseInfo as any;

    const documentPayload = {
      documentType: encryptForge(consultant.documentType),
      documentNumber: encryptForge(consultant.documentNumber),
    };

    const blacklistPayload = {
      names: encryptForge(`${consultant.firstName} ${consultant.middleName}`),
      lastNames: encryptForge(`${consultant.firstLastName} ${consultant.secondLastName}`),
      ...documentPayload,
      identifier: '123e4567-e89b-42d3-a456-556642440000', //TODO: TEMPORAL MIENTRAS HACEN EL CAMBIO A HEADERS
    };

    const blacklist = api.post('/onboarding/blacklist', blacklistPayload, {
      headers: {
        identifier: '123e4567-e89b-42d3-a456-556642440000',
      },
    });

    const documentValidation = api.post('/onboarding/documents/validate', documentPayload, {
      headers: {
        identifier: '123e4567-e89b-42d3-a456-556642440000',
      },
    });

    Promise.all([blacklist, documentValidation])
      .then((responses: any) => {
        const [blackListResponse, docVerificationResponse] = responses;

        const isSuccessCode = (response: any) => response?.data?.code === '200.00.000';

        if (isSuccessCode(blackListResponse) && isSuccessCode(docVerificationResponse)) {
          inc();
        }
      })
      .catch(() => {
        setError(true);
      });
  };

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
          }}
        >
          ¡Inicia YA!
        </Button>
      </Box>
    </Box>
  );
}
