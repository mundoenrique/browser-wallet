'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { isBrowser } from 'react-device-detect';
import { Typography, Box } from '@mui/material';
import { useEffect, useCallback, useState } from 'react';
//Internal app
import { api } from '@/utils/api';
import LogoGreen from '%/images/LogoGreen';
import { DataUserProps } from '@/interfaces';
import { PurpleLayout, NotFoundError } from '@/components';
import logoGreenStatic from '%/images/logoGreenStatic.svg';
import { useHeadersStore, useRegisterStore, useUiStore } from '@/store';

/**
 * Convert phasename
 *
 * @param phase - Phase name
 * @returns Phase step (number) in onboarding in process
 */
const phaseToStep = (phase: string) => {
  const phasesSteps: { [key: string]: number } = {
    ONB_PHASES_TERMS: 2,
    ONB_PHASES_OPT: 3,
    ONB_PHASES_CONSULT_DATA: 4,
    ONB_PHASES_PEP: 4,
    ONB_PHASES_CONTRASENNIA: 4,
  };
  return phasesSteps[phase] || 0;
};

export default function DataUser(props: Readonly<DataUserProps>) {
  const { user, referer, host } = props;

  const { replace } = useRouter();

  const userObject = JSON.parse(user);

  const { setModalError } = useUiStore();

  const setHost = useHeadersStore((state) => state.setHost);

  const updateStep = useRegisterStore((state) => state.updateStep);

  const updateReferer = useHeadersStore((state) => state.setBackLink);

  const updateFormState = useRegisterStore((state) => state.updateFormState);

  const [userValidation, setUserValidation] = useState<any>(null);

  if (host !== '') setHost(host);

  if (referer !== '') updateReferer(referer);

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
      // User new register
      PH_PENDING: {
        path: '/signup',
        store: () => {
          updateFormState('ONB_PHASES_TERMS', registerData);
          updateStep(0);
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
    if (Object.hasOwn(redirectObject, status)) {
      replace(redirectObject[status].path);
    } else {
      return <NotFoundError code={404} />;
    }
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    !userValidation &&
      (async () => {
        const { code, country } = userObject;
        api
          .post(`/onboarding/validate`, {
            consultantCode: code,
            countryCode: country,
          })
          .then(async (response) => {
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
        {isBrowser ? <LogoGreen /> : <Image src={logoGreenStatic} alt="Yiro logo" />}
        <Typography variant="h6" color="white" align="center" sx={{ width: 222 }}>
          Estamos verificando tu información
        </Typography>
      </Box>
    </PurpleLayout>
  );
}
