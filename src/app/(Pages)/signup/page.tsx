'use client';

// Internal app
import { useRegisterStore } from '@/store';
import {
  PepOnboarding,
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

      <PepOnboarding />

      <Biometric />

      <PasswordCreation />
    </SignupStepper>
  );
}
