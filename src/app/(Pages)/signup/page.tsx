'use client';

// Internal app
import { useRegisterStore } from '@/store';
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
  BiometricValidation,
  Ending,
} from './partial';

// const phaseToStep = (phase: string) => {
//   const phasesSteps: { [key: string]: number } = {
//     ONB_PHASES_TERMS: 0,
//     ONB_PHASES_CONSULT_DATA: 3,
//     ONB_PHASES_PEP: 4,
//   };
//   return phasesSteps[phase] || 0;
// };

export default function Signup() {
  const { step } = useRegisterStore();

  return (
    <SignupStepper currentStep={step}>
      <Landing />

      <InfoVerification />

      <CelularValidation />

      <Ocupation />

      <PEP />

      <DniInfo />

      <DniUpload />

      <SelfieInfo />

      <SelfieUpload />

      <BiometricValidation />

      <PasswordCreation />

      <Ending />
    </SignupStepper>
  );
}
