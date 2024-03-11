'use client';

import Confetti from 'react-confetti';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Arrow from '@mui/icons-material/ArrowBackIos';
import { Box, IconButton, Typography } from '@mui/material';
//Internal app
import { useNavTitleStore } from '@/store';
import { PurpleLayoutProps } from '@/interfaces';
import { fuchsiaBlue } from '@/theme/theme-default';
import pelcasDesktop from '%/images/pelcas/pelcasDesktop.png';
import pelcasMobile from '%/images/pelcas/pelcasMobile.png';
/**
 * Purple container used to display response messages
 *
 * @param children - Children elements.
 * @param hidePelca - Hide container art.
 * @param bigModal - Overview.
 * @param left - Content on the left.
 * @param navbar - Show the navigation bar.
 * @param confetti - Show confetti animation.
 */
export default function PurpleLayout({
  children,
  hidePelca,
  bigModal,
  left,
  navbar,
  confetti,
}: PurpleLayoutProps): JSX.Element {
  const { title } = useNavTitleStore();
  const [width, setWidth] = useState<number>();
  const [height, setHeight] = useState<number>();
  const [hideLayout, setHideLayout] = useState<boolean>(true);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current) {
      const width = divRef.current.clientWidth;
      setWidth(width);
      const height = divRef?.current?.offsetHeight;
      setHeight(height);
    }
  }, []);

  return (
    <Box
      ref={divRef}
      sx={{
        display: hideLayout ? 'flex' : 'none',
        flexDirection: 'column',
        alignItems: left ? 'flex-start' : 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        position: bigModal ? 'absolute' : 'initial',
        background: `linear-gradient(180deg, ${fuchsiaBlue[500]} 0%, ${fuchsiaBlue[800]} 100%)`,
        zIndex: bigModal ? 1200 : 'initial',
        width: bigModal ? { xs: '100%', md: 'calc(100% - 315px)' } : 'auto',
        top: bigModal ? 0 : 'auto',
        '&:before': {
          content: hidePelca ? 'none' : `' '`,
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundImage: {
            // xs: `url('/images/pelcas/pelcasMobile.png')`,
            // sm: `url('/images/pelcas/pelcasDesktop.png')`,
          },
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          top: { xs: 0, sm: '-70px' },
        },
        '& > canvas': {
          zIndex: '0 !important',
        },
      }}
    >
      {confetti && <Confetti width={width} height={height} numberOfPieces={500} tweenDuration={40000} />}

      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Image
          src={pelcasDesktop}
          alt="background"
          fill
          sizes="100vw"
          style={{
            objectFit: 'cover',
          }}
          priority
        />
      </Box>
      <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
        <Image
          src={pelcasMobile}
          alt="background"
          fill
          sizes="100vw"
          style={{
            objectFit: 'cover',
          }}
          priority
        />
      </Box>

      {navbar && (
        <Box
          sx={{
            width: '100%',
            height: 60,
            display: { xs: 'flex', md: 'none' },
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 2,
            mb: 3,
          }}
        >
          <IconButton onClick={() => setHideLayout(!hideLayout)}>
            <Arrow sx={{ color: 'white' }} />
          </IconButton>

          <Typography variant="subtitle2" color="white">
            {title}
          </Typography>

          <Box width={40} />
        </Box>
      )}
      <Box sx={{ zIndex: 2, mx: { xs: 'auto', md: 0 } }}>{children}</Box>
    </Box>
  );
}
