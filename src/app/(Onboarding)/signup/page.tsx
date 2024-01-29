'use client';

import { Card, Typography, useMediaQuery, useTheme } from '@mui/material';
// Internal app
import { ChildrenProps } from '@/interfaces';
import { stepperStore } from '@/store/volatileStore';
import BiometricValidation from './components/BiometricValidation';
import {
  SignupStepper,
  Landing,
  InfoVerification,
  CelularValidation,
  Ocupation,
  PEP,
  DniInfo,
  DniUpload,
  SelfieInfo,
  SelfieUpload,
} from './components';

export default function Signup() {
  const theme = useTheme();
  const { step }: any = stepperStore();

  const CardStep = ({ children }: ChildrenProps) => {
    return (
      <Card variant="signup">
        <Typography
          variant={useMediaQuery(theme.breakpoints.down('sm')) ? 'subtitle1' : 'h6'}
          align="center"
          mb={{ sm: 8 }}
        >
          Paso {step}/4
        </Typography>
        {children}
      </Card>
    );
  };

  return (
    <SignupStepper currentStep={step}>
      <Landing />

      <CardStep>
        <InfoVerification />
      </CardStep>

      <CardStep>
        <CelularValidation />
      </CardStep>

      <CardStep>
        <Ocupation />
      </CardStep>

      <CardStep>
        <PEP />
      </CardStep>

      <CardStep>
        <DniInfo />
      </CardStep>

      <CardStep>
        <DniUpload />
      </CardStep>

      <CardStep>
        <SelfieInfo />
      </CardStep>

      <CardStep>
        <SelfieUpload />
      </CardStep>

      <BiometricValidation />
    </SignupStepper>
  );
}
