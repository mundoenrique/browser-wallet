'use client';

import { Box, useMediaQuery, useTheme } from '@mui/material';
//Internal app
import { fuchsiaBlue } from '@/theme/theme-default';
import { ChildrenOptionalProps, ChildrenProps } from '@/interfaces';

const ContainerLayout = ({ children }: ChildrenOptionalProps) => {
  return (
    <Box
      sx={{
        alignItems: 'center',
        background: `linear-gradient(180deg, ${fuchsiaBlue[500]} 0%, ${fuchsiaBlue[800]} 100%)`,
        display: 'flex',
        borderRadius: { xs: '0 0 16px 16px', sm: 'initial' },
        flexDirection: 'column',
        justifyContent: { xs: 'center', sm: 'flex-start' },
        minHeight: { xs: '85%', sm: '100vh' },
        position: { xs: 'absolute', sm: 'initial' },
        width: { xs: '100%', sm: 'auto' },
        '&::before': {
          content: `' '`,
          backgroundImage: {
            xs: `url('/images/pelcas/pelcasMobile.png')`,
            sm: `url('/images/pelcas/pelcasDesktop.png')`,
          },
          backgroundRepeat: 'no-repeat',
          backgroundPosition: { xs: 'initial', sm: 'center' },
          backgroundSize: 'cover',
          height: '100%',
          position: 'absolute',
          top: { xs: 0, sm: '-70px' },
          width: '100%',
        },
      }}
    >
      {children}
    </Box>
  );
};

/**
 * Container used only at login
 *
 * @param children - Children elements.
 */
export default function LoginLayout({ children }: ChildrenProps): JSX.Element {
  const theme = useTheme();
  const matche = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      {matche ? (
        <Box
          sx={{
            backgroundColor: 'secondary.main',
            position: 'relative',
          }}
        >
          <ContainerLayout />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              minHeight: '100vh',
              flexDirection: 'column',
            }}
          >
            {children}
          </Box>
        </Box>
      ) : (
        <ContainerLayout>{children}</ContainerLayout>
      )}
    </>
  );
}
