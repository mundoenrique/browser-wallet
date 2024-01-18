'use client';

//store
import { stepperStore } from '@/store/volatileStore';

// Internal app
import { GradientContainer, CardOnboarding, NavExternal } from '@/components';

//stepper

import { OnboardingStepper, Landing, InfoVerification, CelularValidation, Ocupation } from './components';
import { Typography } from '@mui/material';
import PEP from './components/PEP';

export default function Onboarding() {
  const { step }: any = stepperStore();
  return (
    <>
      {step > 0 && <NavExternal image relative></NavExternal>}
      <OnboardingStepper step={step}>
        {/*Step 0*/}
        <GradientContainer>
          <NavExternal image relative></NavExternal>
          <Landing />
        </GradientContainer>

        {/*Step 1*/}
        <CardOnboarding>
          <Typography variant="h6" align="center">
            Paso 1/4
          </Typography>
          <InfoVerification />
        </CardOnboarding>

        {/*Step 2*/}
        <CardOnboarding>
          <Typography variant="h6" align="center">
            Paso 2/4
          </Typography>
          <CelularValidation />
        </CardOnboarding>

        {/*Step 3*/}
        <CardOnboarding>
          <Typography variant="h6" align="center">
            Paso 3/4
          </Typography>
          <Ocupation />
        </CardOnboarding>

        {/*Step 4*/}
        <CardOnboarding>
          <Typography variant="h6" align="center">
            Paso 3/4
          </Typography>
          <PEP />
        </CardOnboarding>
      </OnboardingStepper>
    </>
  );
}
