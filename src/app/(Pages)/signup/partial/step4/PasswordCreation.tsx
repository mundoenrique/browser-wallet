'use client';

import { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { sendGTMEvent } from '@next/third-parties/google';
//Internal app
import Ending from '../Ending';
import { api } from '@/utils/api';
import { FormPass } from '@/components';
import { CardStep, ErrorPage } from '..';
import { encryptForge } from '@/utils/toolHelper';
import { useRegisterStore, useUiStore, useCatalogsStore, useUserStore, useHeadersStore } from '@/store';

export default function PasswordCreation() {
  const { setUserId } = useUserStore();

  const host = useHeadersStore((state) => state.host);

  const { setModalError, setLoadingScreen } = useUiStore();

  const { updateCatalog, passwordTermsCatalog } = useCatalogsStore();

  const phaseInfo = useRegisterStore((state) => state.ONB_PHASES_TERMS);

  const { updateStep, setShowHeader, onboardingUuId, control } = useRegisterStore();

  const [error, setError] = useState<boolean>(false);

  const [loadingModal, setLoadingModal] = useState<boolean>(false);

  const validateBiometric = async (data: any) => {
    const { consultant } = phaseInfo as any;
    const shortDoc = consultant.documentType === 'DNI' ? consultant.documentNumber.slice(2) : consultant.documentNumber;
    const payload = {
      payload: {
        contacts: [
          {
            person: {
              names: [
                {
                  firstName: encryptForge(`${consultant.firstName} ${consultant.middleName}`),
                  surName: encryptForge(consultant.firstLastName),
                },
              ],
            },
            identityDocuments: [
              {
                documentType: encryptForge(consultant.documentType),
                documentNumber: encryptForge(shortDoc),
                hashedDocumentNumber: encryptForge(shortDoc),
              },
            ],
            telephones: [
              {
                number: encryptForge(consultant.phoneNumber),
                phoneIdentifier: encryptForge('MOBILE'),
              },
            ],
            emails: [
              {
                type: encryptForge('HOME'),
                email: encryptForge(consultant.email),
              },
            ],
          },
        ],
        control: [
          {
            option: 'ACCOUNTID_JM',
            value: control.accountId,
          },
          {
            option: 'WORKFLOWID_JM',
            value: control.workflowId,
          },
        ],
      },
    };
    setLoadingScreen(true, { message: 'Estamos verificando tu información' });
    await api
      .post('/onboarding/validatebiometric', payload)
      .then((response) => {
        const { decision } = response.data.data;
        if (decision === 'ACCEPT') {
          onSubmit(data);
        } else if (decision === 'ERROR') {
          setLoadingScreen(false);
          setError(true);
        } else if (decision === 'STOP' || decision === 'REJECT') {
          setLoadingScreen(false);
          updateStep(4);
          setModalError({
            title: 'Algo salió mal',
            description: 'No pudimos validar tus datos, inténtalo nuevamente.',
          });
        } else {
          let attempts = 0;
          const retryBiometricValidation = () => {
            if (attempts < 2) {
              attempts++;
              setTimeout(
                () => {
                  validateBiometric(data);
                },
                attempts == 1 ? 10000 : 5000
              );
            } else {
              setLoadingScreen(false);
              updateStep(4);
              setModalError({
                title: 'Ups!',
                description: 'No pudimos validar tus datos después de varios intentos. intentalo nuevamente.',
              });
            }
          };
          retryBiometricValidation();
        }
      })
      .catch(() => {
        setLoadingScreen(false);
        updateStep(4);
        setModalError({ title: 'Algo salió mal', description: 'No pudimos validar tus datos.' });
      });
  };

  useEffect(() => {
    sendGTMEvent({
      event: 'ga4.trackEvent',
      eventName: 'page_view_ga4',
      eventParams: {
        page_location: `${host}/signup/onboarding/step4`,
        page_title: 'Yiro :: onboarding :: step4 :: createPassword',
        page_referrer: `${host}/signup/onboarding/step3-2`,
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
    setLoadingScreen(true, { message: 'Estamos verificando tu información' });

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

  if (error) {
    return <ErrorPage />;
  }

  return (
    <>
      {!loadingModal && (
        <CardStep stepNumber="4">
          <FormPass
            register
            onSubmit={validateBiometric}
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
                        destination_page: `${host}/signin`,
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
                        destination_page: `${host}/signin`,
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
