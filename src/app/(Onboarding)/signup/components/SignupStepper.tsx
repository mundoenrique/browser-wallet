'use client';

//Internal app
import { NavExternal } from '@/components';
import { Box } from '@mui/material';

export default function SignupStepper(props: { step: number; children: JSX.Element[] }) {
  const { step, children } = props;

  return (
    <Box
      sx={{
        background: step > 0 ? 'none' : 'linear-gradient(35deg, rgba(146,218,142,0) 20%, rgba(172,255,167,0.6) 100%)',
        minHeight: '100vh',
      }}
    >
      <NavExternal image relative />
      {children[step]}
    </Box>
  );
}
