'use client';

import { useRouter } from 'next/navigation';
import { Typography, Box } from '@mui/material';
import { useEffect, useCallback, useState } from 'react';
//Internal app
import { api } from '@/utils/api';
import LogoGreen from '%/images/LogoGreen';
import { DataUserProps } from '@/interfaces';
import { useRegisterStore, useUiStore } from '@/store';
import { PurpleLayout, NotFoundError } from '@/components';

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
    ONB_PHASES_CONTRASENNIA: 5,
  };
  return phasesSteps[phase] || 0;
};

export default function DataUser({ user }: DataUserProps) {
  const userObject = JSON.parse(user);
  // const customApi = useApi();
  const [userValidation, setUserValidation] = useState<any>(null);
  const updateFormState = useRegisterStore((state) => state.updateFormState);
  const updateStep = useRegisterStore((state) => state.updateStep);

  const { replace } = useRouter();
  const { setModalError } = useUiStore();
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
    !userValidation &&
      (async () => {
        const { code, country } = userObject;
        api
          .get(`/onboarding/validate?consultantCode=${code}&countryCode=${country}`)
          .then((response) => {
            setUserValidation(response.data);
          })
          .catch(() => {
            setModalError();
          });
      })();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    userValidation && userRedirect(userValidation);
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
