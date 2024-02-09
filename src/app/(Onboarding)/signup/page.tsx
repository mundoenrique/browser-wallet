'use client';

import { Card, Typography, useMediaQuery, useTheme } from '@mui/material';
// Internal app
import { StepperProps } from '@/interfaces';
import { useSignupStore } from '@/store/signupStore';
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
  PasswordCreation,
  Ending,
} from './components';

const phaseToStep = (phase: string) => {
  const phasesSteps: { [key: string]: number } = {
    ONB_PHASES_TERMS: 0,
    ONB_PHASES_CONSULT_DATA: 3,
    ONB_PHASES_PEP: 4,
  };
  return phasesSteps[phase] || 0;
};

const CardStep = (props: StepperProps) => {
  const theme = useTheme();
  const { children, stepNumber } = props;
  return (
    <Card variant="signup">
      <Typography
        variant={useMediaQuery(theme.breakpoints.down('sm')) ? 'subtitle1' : 'h6'}
        align="center"
        mb={{ sm: 4 }}
      >
        Paso {stepNumber}/4
      </Typography>
      {children}
    </Card>
  );
};
export default function Signup() {
  const { step } = useSignupStore();

  return (
    <SignupStepper currentStep={step}>
      <Landing />

      <CardStep stepNumber="1">
        <InfoVerification />
      </CardStep>

      <CardStep stepNumber="2">
        <CelularValidation />
      </CardStep>

      <CardStep stepNumber="3">
        <Ocupation />
      </CardStep>

      <CardStep stepNumber="3">
        <PEP />
      </CardStep>

      <CardStep stepNumber="4">
        <DniInfo />
      </CardStep>

      <CardStep stepNumber="4">
        <DniUpload />
      </CardStep>

      <CardStep stepNumber="4">
        <SelfieInfo />
      </CardStep>

      <CardStep stepNumber="4">
        <SelfieUpload />
      </CardStep>

      <BiometricValidation />

      <CardStep stepNumber="4">
        <PasswordCreation />
      </CardStep>

      <Ending />
    </SignupStepper>
  );
}
