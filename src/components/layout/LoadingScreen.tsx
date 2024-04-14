'use client';

import { Backdrop } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useUiStore } from '@/store';

export default function LoadingScreen() {
  const { loadingScreen } = useUiStore();
  return (
    <Backdrop open={loadingScreen} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
