'use client';

import { Backdrop, CircularProgress } from '@mui/material';
//Internal app
import { useUiStore } from '@/store';

export default function LoadingScreen() {
  const { loadingScreen } = useUiStore();

  return (
    <Backdrop open={loadingScreen} sx={{ color: '#fff', zIndex: 2001 }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
