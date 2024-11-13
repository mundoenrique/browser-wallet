'use client';

import { Box, useMediaQuery, useTheme } from '@mui/material';
//Internal app
import { Pelca } from '..';
import { ChildrenProps } from '@/interfaces';
import { fuchsiaBlue } from '@/theme/theme-default';

const ContainerLayout = ({ children }: ChildrenProps) => {
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
      }}
    >
      <Pelca />
      {children}
    </Box>
  );
};

/**
 * Container used only at login
 *
 * @param children - Children elements.
 */
export default function LoginLayout({ children }: Readonly<ChildrenProps>): JSX.Element {
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      {match ? (
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
