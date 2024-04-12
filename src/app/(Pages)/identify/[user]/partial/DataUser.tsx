'use client';

import { useRouter } from 'next/navigation';
import { Typography, Box } from '@mui/material';
import { useEffect, useCallback, useState } from 'react';
//Internal app
import { useApi } from '@/hooks/useApi';
import LogoGreen from '%/images/LogoGreen';
import { useRegisterStore } from '@/store';
import { DataUserProps } from '@/interfaces';
import { PurpleLayout, NotFoundError } from '@/components';
import { useSessionStore } from '@/store';
import { set } from 'react-hook-form';

/**
 * Convert phasename
 *
 * @param phase - Phase name
 * @returns Phase step (number) in onboarding in process
 */
const phaseToStep = (phase: string) => {
  const phasesSteps: { [key: string]: number } = {
    ONB_PHASES_TERMS: 2,
    ONB_PHASES_OTP: 3,
    ONB_PHASES_CONSULT_DATA: 4,
    ONB_PHASES_PEP: 5,
    //ONB_PHASES_VALIDATE_BIOMETRIC: 5,
    ONB_PHASES_PASSWORD: 6,
  };
  return phasesSteps[phase] || 0;
};

export default function DataUser(user: DataUserProps) {
  const userObject = JSON.parse(user.user);
  const customApi = useApi();
  const [userValidation, setUserValidation] = useState<any>(null);
  const { updateFormState, updateStep } = useRegisterStore();
  const { replace } = useRouter();
  const { uuid, setUuid } = useSessionStore();
  // setUuid(userObject.uuid);
  /**
   * Verify the user and redirect
   */
  const userRedirect = useCallback(async (userValidationResponse: any) => {
    const status = userValidationResponse.data?.status.code;
    const registerData = userValidationResponse.data;

    const redirectObject: { [key: string]: { path: string; store: Function } } = {
      //User register finished
      PH_REGISTER: {
        path: '/signin',
        store: () => {
          updateFormState('user', registerData.user);
        },
      },
      // User rew register
      PH_PENDING: {
        path: '/signup',
        store: () => {
          updateFormState('ONB_PHASES_TERMS', registerData);
        },
      },
      //User register in progress
      PH_IN_PROGRESS: {
        path: '/signup',
        store: () => {
          //TODO: Hay un porblema con la variable onboardingUuid que esta pendiente de ajustar el nombre
          updateFormState('onboardingUuId', registerData.status.onboardingUuid);
          registerData.onboardingPhases.forEach((phase: any) => {
            updateFormState(phase.onboardingPhaseCode, phase.metadata);
          });
          updateStep(phaseToStep(registerData.currentOnboardingPhaseCode));
        },
      },
    };
    Object.hasOwn(redirectObject, status) && (await redirectObject[status].store());

    Object.hasOwn(redirectObject, status) ? replace(redirectObject[status].path) : <NotFoundError code={404} />;
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const validateOnboarding = async () => {
      try {
        const userData = await customApi.get(
          `/onboarding/validate?consultantCode=${userObject.code}&countryCode=${userObject.country}`
        );
        setUserValidation(userData.data);
      } catch (error) {
        throw new Error('Error in apiGee request handling: ' + (error as Error).message);
      }
    };
    validateOnboarding();
  }, []); //eslint-disable-line

  useEffect(() => {
    userValidation && userRedirect(userValidation);
    setUuid(userObject.uuid);
    console.log('identify', userValidation);
  }, [userValidation, userRedirect]);

  return (
    <PurpleLayout>
      <Box sx={{ zIndex: 1, display: 'grid', justifyItems: 'center', gap: 3 }}>
        <LogoGreen />
        <Typography variant="h6" color="white" align="center" sx={{ width: 222 }}>
          Estamos verificando tu información
        </Typography>
      </Box>
    </PurpleLayout>
  );
}
