'use client';

import { Card, Typography, useMediaQuery, useTheme } from '@mui/material';
// Internal app
import { stepperStore } from '@/store/volatileStore';
import { GradientContainer, NavExternal } from '@/components';
import { SignupStepper, Landing, InfoVerification, CelularValidation, Ocupation, PEP } from './components';

export default function Signup() {
  const theme = useTheme();
  const { step }: any = stepperStore();

  return (
    <>
      {step > 0 && <NavExternal image relative closeApp />}
      <SignupStepper step={step}>
        {/*Step 0*/}
        <GradientContainer>
          <NavExternal image relative closeApp />
          <Landing />
        </GradientContainer>

        {/*Step 1*/}
        <Card variant="signup">
          <Typography
            variant={useMediaQuery(theme.breakpoints.down('sm')) ? 'subtitle1' : 'h6'}
            align="center"
            mb={{ sm: 7 }}
          >
            Paso 1/4
          </Typography>
          <InfoVerification />
        </Card>

        {/*Step 2*/}
        <Card variant="signup">
          <Typography
            variant={useMediaQuery(theme.breakpoints.down('sm')) ? 'subtitle1' : 'h6'}
            align="center"
            mb={{ sm: 7 }}
          >
            Paso 2/4
          </Typography>
          <CelularValidation />
        </Card>

        {/*Step 3*/}
        <Card variant="signup">
          <Typography
            variant={useMediaQuery(theme.breakpoints.down('sm')) ? 'subtitle1' : 'h6'}
            align="center"
            mb={{ sm: 7 }}
          >
            Paso 3/4
          </Typography>
          <Ocupation />
        </Card>

        {/*Step 4*/}
        <Card variant="signup">
          <Typography
            variant={useMediaQuery(theme.breakpoints.down('sm')) ? 'subtitle1' : 'h6'}
            align="center"
            mb={{ sm: 7 }}
          >
            Paso 3/4
          </Typography>
          <PEP />
        </Card>
      </SignupStepper>
    </>
  );
}
