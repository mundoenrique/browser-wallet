'use client';

import { Card, Typography } from '@mui/material';
// Internal app
import { stepperStore } from '@/store/volatileStore';
import { GradientContainer, NavExternal } from '@/components';
import { SignupStepper, Landing, InfoVerification, CelularValidation, Ocupation, PEP } from './components';

export default function Signup() {
  const { step }: any = stepperStore();

  return (
    <>
      {step > 0 && <NavExternal image relative></NavExternal>}
      <SignupStepper step={step}>
        {/*Step 0*/}
        <GradientContainer>
          <NavExternal image relative />
          <Landing />
        </GradientContainer>

        {/*Step 1*/}
        <Card variant="signup">
          <Typography variant="h6" align="center">
            Paso 1/4
          </Typography>
          <InfoVerification />
        </Card>

        {/*Step 2*/}
        <Card variant="signup">
          <Typography variant="h6" align="center">
            Paso 2/4
          </Typography>
          <CelularValidation />
        </Card>

        {/*Step 3*/}
        <Card variant="signup">
          <Typography variant="h6" align="center">
            Paso 3/4
          </Typography>
          <Ocupation />
        </Card>

        {/*Step 4*/}
        <Card variant="signup">
          <Typography variant="h6" align="center">
            Paso 3/4
          </Typography>
          <PEP />
        </Card>
      </SignupStepper>
    </>
  );
}
