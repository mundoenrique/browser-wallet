'use client';

import { Box } from '@mui/material';
//Internal app
import { ChildrenProps } from '@/interfaces';

export default function GradientContainer(props: { children: JSX.Element | JSX.Element[]; disable?: boolean }) {
  const { children, disable = false } = props;
  return (
    <Box
      sx={{
        background: !disable
          ? 'linear-gradient(35deg, rgba(146,218,142,0) 20%, rgba(172,255,167,0.6) 100%)'
          : 'initial',
        minHeight: '100vh',
      }}
    >
      {children}
    </Box>
  );
}
