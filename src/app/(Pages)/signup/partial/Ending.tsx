'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography, Zoom } from '@mui/material';
//Internal app
import { useRegisterStore } from '@/store';
import ending1 from '%/images/ending1.svg';
import ending2 from '%/images/ending2.svg';
import LogoGreen from '%/images/LogoGreen';
import { PurpleLayout } from '@/components';
import { fuchsiaBlue } from '@/theme/theme-default';

const animationEnding = [
  {
    src: ending1,
  },
  {
    src: ending2,
  },
];

export default function Ending() {
  const { push } = useRouter();
  const { setShowHeader } = useRegisterStore();
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

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

  //TODO:timeEvent es de implementacion temporal
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
          push('/signin');
        });
    })();
  }, [setShowHeader, push]);

  return (
    <PurpleLayout>
      <Box sx={{ zIndex: 1, display: 'grid', justifyContent: 'center' }}>
        <Zoom in={true}>
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {currentImageIndex < 2 && (
              <Image
                src={animationEnding[currentImageIndex].src}
                width={468}
                height={291}
                alt={`Animation Yiro ${currentImageIndex}`}
                priority
              />
            )}
            {currentImageIndex >= 1 && (
              <Box
                sx={{
                  position: currentImageIndex === 1 ? 'absolute' : 'relative',
                  width: 468,
                  height: 291,
                  top: '38%',
                  left: '38%',
                  display: 'flex',
                  '&>svg': {
                    transition: 'transform 0.5s',
                    transform: currentImageIndex === 1 ? 'scale(0.8)' : 'scale(1.0)',
                    width: currentImageIndex === 1 ? '110px' : '132px',
                    height: currentImageIndex === 1 ? '61px' : '74px',
                  },
                }}
              >
                <LogoGreen />
              </Box>
            )}
          </Box>
        </Zoom>
        <Box>
          {currentImageIndex < 2 && (
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
          )}
        </Box>
      </Box>
    </PurpleLayout>
  );
}
