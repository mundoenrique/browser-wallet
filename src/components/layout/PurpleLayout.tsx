'use client';

import { Box } from '@mui/material';
//Internal app
import { PurpleLayoutProps } from '@/interfaces';

export default function PurpleLayout({ children, hidePelca }: PurpleLayoutProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #947bd7 0%, #5f3f98 100%)',
        '&:before': {
          content: hidePelca ? 'none' : `' '`,
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundImage: {
            xs: `url('/images/pelcas/pelcasMobile.png')`,
            sm: `url('/images/pelcas/pelcasDesktop.png')`,
          },
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          top: { xs: 0, sm: '-70px' },
        },
      }}
    >
      {children}
    </Box>
  );
}
