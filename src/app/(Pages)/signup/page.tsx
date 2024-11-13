'use client';

// Internal app
import { useRegisterStore } from '@/store';
import {
  Pep,
  Landing,
  Ocupation,
  SignupStepper,
  InfoVerification,
  CelularValidation,
  PasswordCreation,
  Biometric,
} from './partial';

export default function Signup() {
  const { step } = useRegisterStore();

  return (
    <SignupStepper currentStep={step}>
      <Landing />

      <InfoVerification />

      <CelularValidation />

      <Ocupation />

      <Pep />

      <Biometric />

      <PasswordCreation />
    </SignupStepper>
  );
}
