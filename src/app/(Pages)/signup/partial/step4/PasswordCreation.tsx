'use client';

import { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { sendGTMEvent } from '@next/third-parties/google';
//Internal app
import { CardStep } from '..';
import Ending from '../Ending';
import { api } from '@/utils/api';
import { FormPass } from '@/components';
import { encryptForge } from '@/utils/toolHelper';
import { useRegisterStore, useUiStore, useCatalogsStore, useUserStore, useHeadersStore } from '@/store';

export default function PasswordCreation() {
  const { setUserId } = useUserStore();

  const host = useHeadersStore((state) => state.host);

  const { setModalError, setLoadingScreen } = useUiStore();

  const { updateStep, setShowHeader, onboardingUuId } = useRegisterStore();

  const { updateCatalog, passwordTermsCatalog } = useCatalogsStore();

  const [loadingModal, setLoadingModal] = useState<boolean>(false);

  useEffect(() => {
    sendGTMEvent({
      event: 'ga4.trackEvent',
      eventName: 'page_view_ga4',
      eventParams: {
        page_location: `${host}/signup`,
        page_title: 'Yiro :: onboarding :: step4 :: createPassword',
        page_referrer: `${host}/identify`,
        section: 'Yiro :: onboarding :: step4 :: createPassword',
        previous_section: 'Yiro :: onboarding :: step3 :: 3.3PEP',
      },
    });
  }, [host]);

  useEffect(() => {
    const fetchTermPasswordCatalog = async () => {
      api
        .post('/catalogs/search', {
          catalogCode: 'TERMS_AND_CONDITIONS_CATALOG',
          parameters: [
            {
              code: 'TERMS_CATEGORY',
              value: 'ONB_PHASES_CONTRASENNIA',
            },
          ],
        })
        .then((response) => {
          updateCatalog('passwordTermsCatalog', response.data.data.data);
        })
        .catch((e) => {
          setModalError({ error: e });
        });
    };
    {
      passwordTermsCatalog.length === 0 && fetchTermPasswordCatalog();
    }
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = async (data: any) => {
    const termsObject: { [key: string]: boolean } = {
      'TERMINO 3': data.policy,
    };

    const cipherPassword = encryptForge(data.newPassword);
    const requestFormData = {
      currentPhaseCode: 'ONB_PHASES_CONTRASENNIA',
      onboardingUuId: onboardingUuId,
      request: {
        password: cipherPassword,
        terms: passwordTermsCatalog.reduce((acc: any[], e) => {
          termsObject[e.value] && acc.push({ code: e.code });
          return acc;
        }, []),
      },
    };
    setLoadingScreen(true);

    api
      .post('/onboarding/credentials', requestFormData)
      .then((response) => {
        setUserId(response.data.data.user.userId);
        setLoadingModal(true);
      })
      .catch((e) => {
        setModalError({ error: e });
      })
      .finally(() => {
        setLoadingScreen(false);
      });
  };

  useEffect(() => {
    setShowHeader(true);
  }, [setShowHeader]);

  return (
    <>
      {!loadingModal && (
        <CardStep stepNumber="4">
          <FormPass
            register
            onSubmit={onSubmit}
            description={
              <>
                <Typography variant="subtitle1" sx={{ mb: 3, mx: 'auto' }}>
                  Ahora es momento de activar tu cuenta
                </Typography>
                <Typography variant="body2" mb={3 / 2}>
                  Para finalizar crea una contraseña segura
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2">Elige 6 números que recuerdes.</Typography>
                  <Typography variant="body2">Evita fechas de cumpleaños, números consecutivos ó iguales.</Typography>
                </Box>
              </>
            }
            buttons={
              <>
                <Button
                  variant="outlined"
                  onClick={() => {
                    updateStep(4);
                    sendGTMEvent({
                      event: 'ga4.trackEvent',
                      eventName: 'select_content',
                      eventParams: {
                        content_type: 'boton',
                        section: 'Yiro :: onboarding :: step4 :: createPassword',
                        previous_section: 'Yiro :: onboarding :: step3 :: 3.3PEP',
                        selected_content: 'Anterior',
                        destination_page: `${host}/signup`,
                      },
                    });
                  }}
                >
                  Anterior
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  onClick={() => {
                    sendGTMEvent({
                      event: 'ga4.trackEvent',
                      eventName: 'select_content',
                      eventParams: {
                        content_type: 'boton',
                        section: 'Yiro :: onboarding :: step4 :: createPassword',
                        previous_section: 'Yiro :: onboarding :: step3 :: 3.3PEP',
                        selected_content: 'Siguiente',
                        destination_page: `${host}/signup`,
                      },
                    });
                  }}
                >
                  Siguiente
                </Button>
              </>
            }
          />
        </CardStep>
      )}

      {loadingModal && <Ending />}
    </>
  );
}
