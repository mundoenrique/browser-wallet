'use client';

import { Box } from '@mui/system';
//Internal app
import { ContainerLayoutProps } from '@/interfaces';

export default function ContainerLayout(props: ContainerLayoutProps) {
  const { children, fullWidth } = props;
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: { xs: 'flex-start', md: 'center' },
        width: fullWidth ? 'auto' : 320,
        minHeight: '100vh',
        mx: { xs: 'auto', md: 3 },
      }}
    >
      {children}
    </Box>
  );
}
