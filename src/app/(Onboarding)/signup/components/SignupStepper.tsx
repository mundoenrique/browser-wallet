'use client';

//Internal app
import { Box } from '@mui/material';
import { NavExternal } from '@/components';

export default function SignupStepper(props: { currentStep: number; children: JSX.Element[] }) {
  const { currentStep, children } = props;

  return (
    <Box
      sx={{
        background:
          currentStep > 0 ? 'none' : 'linear-gradient(35deg, rgba(146,218,142,0) 20%, rgba(172,255,167,0.6) 100%)',
        minHeight: '100vh',
      }}
    >
      {currentStep < 7 && <NavExternal image relative closeApp />}
      {children[currentStep]}
    </Box>
  );
}
