'use client';

// Internal app
import { useRegisterStore } from '@/store';
import {
  PEP,
  Landing,
  Ocupation,
  SignupStepper,
  InfoVerification,
  CelularValidation,
  PasswordCreation,
  ErrorPage,
} from './partial';

export default function Signup() {
  const { step } = useRegisterStore();

  return (
    <SignupStepper currentStep={step}>
      <Landing />

      <InfoVerification />

      <CelularValidation />

      <Ocupation />

      <PEP />

      <PasswordCreation />
    </SignupStepper>
  );
}
