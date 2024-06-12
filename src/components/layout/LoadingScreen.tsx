'use client';

import { Backdrop, CircularProgress, Typography, Box } from '@mui/material';
//Internal app
import { useUiStore } from '@/store';
import LogoGreen from '%/images/LogoGreen';
import { PurpleLayout } from '@/components';

export default function LoadingScreen() {
  const loadingScreen = useUiStore((state) => state.loadingScreen);
  const loadingScreenOptions = useUiStore((state) => state.loadingScreenOptions);

  return (
    <Backdrop open={loadingScreen} sx={{ color: '#fff', zIndex: 2001 }}>
      <CircularProgress color="inherit" />
      {Object.hasOwn(loadingScreenOptions, 'message') && <ModalLogo message={loadingScreenOptions.message} />}
    </Backdrop>
  );
}

const ModalLogo = ({ message }: any) => {
  return (
    <PurpleLayout bigModal>
      <Box sx={{ zIndex: 1, display: 'grid', justifyItems: 'center' }}>
        <LogoGreen />
        <Typography variant="h6" color="white" align="center" width={222}>
          {message}
        </Typography>
      </Box>
    </PurpleLayout>
  );
};
