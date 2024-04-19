'use client';

import { useUiStore } from '@/store';
import { Backdrop } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

export default function LoadingScreen() {
  const { loadingScreen } = useUiStore();
  return (
    <Backdrop open={loadingScreen} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
