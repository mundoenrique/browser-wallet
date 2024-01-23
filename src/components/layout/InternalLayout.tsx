'use client';

import { Box } from '@mui/material';
//Internal app
import { ChildrenProps } from '@/interfaces';

export default function InternalLayout({ children }: ChildrenProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #947bd7 0%, #5f3f98 100%)',
      }}
    >
      {children}
    </Box>
  );
}
