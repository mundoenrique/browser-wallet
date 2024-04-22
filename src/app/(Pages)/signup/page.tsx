'use client';

// Internal app
import { useRegisterStore } from '@/store';
import {
  PEP,
  Ending,
  Landing,
  Ocupation,
  SignupStepper,
  InfoVerification,
  CelularValidation,
  PasswordCreation,
} from './partial';
import { useEffect } from 'react';

export default function Signup() {
  const { step } = useRegisterStore();
  useEffect(() => {
    const handleConnection = () => {
      console.log('inicio');
    };
    window.addEventListener('offline', handleConnection);
  });

  return (
    <SignupStepper currentStep={step}>
      <Landing />

      <InfoVerification />

      <CelularValidation />

      <Ocupation />

      <PEP />

      <PasswordCreation />

      <Ending />
    </SignupStepper>
  );
}
