'use client';

import { Box } from '@mui/material';
//Internal app
import { ChildrenProps } from '@/interfaces';

export default function GradientContainer({ children }: ChildrenProps) {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        background: 'linear-gradient(35deg, rgba(146,218,142,0) 20%, rgba(172,255,167,0.6) 100%)',
      }}
    >
      {children}
    </Box>
  );
}
