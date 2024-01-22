'use client';

import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
//Internal app
import { NavExternal } from '@/components';
import { ChildrenProps } from '@/interfaces';

const DesktopLayout = ({ children }: ChildrenProps) => {
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
          content: `' '`,
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundImage: `url('/images/pelcasDesktop.png')`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          top: '-70px',
        },
      }}
    >
      <NavExternal color="white" />
      {children}
    </Box>
  );
};

const PwaLayout = ({ children }: ChildrenProps) => {
  return (
    <Box
      sx={{
        backgroundColor: 'secondary.main',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(180deg, #947bd7 0%, #5f3f98 100%)',
          borderRadius: '0 0 16px 16px',
          position: 'absolute',
          minHeight: '85%',
          '&::before': {
            content: `' '`,
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundImage: `url('/images/pelcasMobile.png')`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          },
        }}
      />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          minHeight: '100vh',
          flexDirection: 'column',
        }}
      >
        <NavExternal color="white" />
        {children}
      </Box>
    </Box>
  );
};

export default function MainLayout({ children }: ChildrenProps) {
  const theme = useTheme();
  const matche = useMediaQuery(theme.breakpoints.down('sm'));

  return <>{matche ? <PwaLayout>{children}</PwaLayout> : <DesktopLayout>{children}</DesktopLayout>}</>;
}
