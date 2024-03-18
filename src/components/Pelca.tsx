'use client';

import Image from 'next/image';
import { Box } from '@mui/material';
//Internal app
import pelcasMobile from '%/images/pelcas/pelcasMobile.png';
import pelcasDesktop from '%/images/pelcas/pelcasDesktop.png';

export default function Pelca() {
  return (
    <>
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Image
          src={pelcasDesktop}
          alt="background"
          sizes="100vw"
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            inset: 0,
            objectFit: 'cover',
          }}
          priority
        />
      </Box>

      <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
        <Image
          src={pelcasMobile}
          alt="background"
          sizes="100vw"
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            inset: 0,
            objectFit: 'cover',
          }}
          priority
        />
      </Box>
    </>
  );
}
