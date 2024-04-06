'use client';

import { useCallback, useEffect } from 'react';
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

import { useMockStore } from '@/store/mockStore';

export default function Signup() {
  const { step } = useRegisterStore();
  const { mockData } = useMockStore();

  const validateUser = useCallback(() => {
    console.log(mockData);
  }, [mockData]);

  useEffect(() => {
    validateUser();
  }, [validateUser]);

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
