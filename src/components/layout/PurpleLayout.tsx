'use client';

import { Box } from '@mui/material';
//Internal app
import { PurpleLayoutProps } from '@/interfaces';
import { fuchsiaBlue } from '@/theme/theme-default';

/**
 * Purple container used to display response messages
 *
 * @param children - Children elements.
 * @param hidePelca - Hide container art.
 */
export default function PurpleLayout({ children, hidePelca }: PurpleLayoutProps): JSX.Element {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: `linear-gradient(180deg, ${fuchsiaBlue[500]} 0%, ${fuchsiaBlue[800]} 100%)`,
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
