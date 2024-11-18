'use client';

import { Box } from '@mui/system';
//Internal app
import { ContainerLayoutProps } from '@/interfaces';

/**
 * Global application container
 *
 * @param children - Children elements.
 * @param fullWidth - Container width.
 */
export default function ContainerLayout(props: Readonly<ContainerLayoutProps>): JSX.Element {
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
