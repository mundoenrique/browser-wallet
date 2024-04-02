'use client';
import { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
//internal app
import { useRegisterStore } from '@/store';
import { useMockStore } from '@/store/mockStore';

export default function Identity({ userId }: { userId: any }) {
  const [userValidation, setUserValidation] = useState<any>(null);
  const { push } = useRouter();
  const { updateFormState, updateStep } = useRegisterStore();
  const { setMockData } = useMockStore();

  /**
   *
   * @param phase
   * @returns phase number in onboarding in process
   */
  const phaseToStep = (phase: string) => {
    const phasesSteps: { [key: string]: number } = {
      ONB_PHASES_TERMS: 1,
      ONB_PHASES_OTP: 2,
      ONB_PHASES_CONSULT_DATA: 3,
      ONB_PHASES_PEP: 4,
      ONB_PHASES_VALIDATE_BIOMETRIC: 5,
      ONB_PHASES_PASSWORD: 10,
    };
    return phasesSteps[phase] || 0;
  };

  const userRedirect = useCallback(async (userValidationResponse: any) => {
    const status = userValidationResponse.data?.status.code;
    const registerData = userValidationResponse.data;

    const redirectObject: { [key: string]: { path: string; store: Function } } = {
      //TODO:DONE
      PH_REGISTER: {
        path: '/signin',
        store: () => {
          setMockData({ user: { ...registerData.user } });
        },
      },
      //TODO: new register
      PH_PENDING: {
        path: '/signup',
        store: () => {
          setMockData({ ...registerData });
          updateFormState('ONB_PHASES_TERMS', registerData);
        },
      },
      //TODO:In pogress
      PH_IN_PROGRESS: {
        path: '/signup',
        store: () => {
          registerData.onboardingPhases.forEach((phase: any) => {
            updateFormState(phase.onboardingPhaseCode, phase.metadata);
          });

          console.log(registerData);
          updateStep(phaseToStep(registerData.currentOnboardingPhaseCode));
        },
      },
    };
    Object.hasOwn(redirectObject, status) && (await redirectObject[status].store());

    Object.hasOwn(redirectObject, status) ? push(redirectObject[status].path) : push('/');
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const fetchData = useCallback(async () => {
    await fetch(`/api/mock/onboarding/validate?${userId}`).then(async (response) => {
      const fetchData = await response.json();
      setUserValidation(fetchData);
    });
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchData();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    userValidation && userRedirect(userValidation);
  }, [userValidation, userRedirect]);
  return <></>;
}
