'use client';

import { useCallback, useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
//Internal app
import { CardStep } from '..';
import Ending from '../Ending';
import { api } from '@/utils/api';
import { FormPass } from '@/components';
import { encryptForge } from '@/utils/toolHelper';
import { useRegisterStore, useUiStore, useCatalogsStore, useUserStore } from '@/store';

export default function PasswordCreation() {
  const { setUserId } = useUserStore();

  const { setModalError, setLoadingScreen } = useUiStore();

  const { updateStep, setShowHeader, onboardingUuId, ONB_PHASES_TERMS } = useRegisterStore();

  const { updateCatalog, passwordTermsCatalog } = useCatalogsStore();

  const [loadingModal, setLoadingModal] = useState<boolean>(false);

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

  const validateBiometric = useCallback(async () => {
    const requestData = {
      payload: {
        contacts: [
          {
            person: {
              names: [
                {
                  firstName: encryptForge(ONB_PHASES_TERMS?.consultant?.firstName),
                  secondName: encryptForge(ONB_PHASES_TERMS?.consultant?.firstLastName),
                  surName: 'DaD/9QLkb+WyQn9FRk40vg==',
                  surName2: 'DaD/9QLkb+WyQn9FRk40vg==',
                },
              ],
            },
            identityDocuments: [
              {
                documentType: encryptForge(ONB_PHASES_TERMS?.consultant?.documentType),
                documentNumber: encryptForge(ONB_PHASES_TERMS?.consultant?.documentNumber),
                hashedDocumentNumber: encryptForge(ONB_PHASES_TERMS?.consultant?.documentNumber),
              },
            ],
            telephones: [
              {
                number: encryptForge(ONB_PHASES_TERMS?.consultant?.phoneNumber),
                phoneIdentifier: encryptForge('PHONE'),
              },
            ],
            emails: [
              {
                type: encryptForge('HOME'),
                email: encryptForge(ONB_PHASES_TERMS?.consultant?.email),
              },
            ],
          },
        ],
        control: [
          {
            option: 'ACCOUNTID_JM',
            value: '5ce53517-b2c9-4a90-8e3a-04b368ae0ce8',
          },
          {
            option: 'WORKFLOWID_JM',
            value: 'e0f052b2-c9d1-4add-8433-edf36b01240d',
          },
        ],
      },
    };
    api
      .post('/onboarding/validatebiometric', requestData)
      .then((response) => {
        console.log('🚀 ~ validateBiometric ~ response.data:', response.data.data);
      })
      .catch((e) => {
        console.log('🚀 ~ validateBiometric ~ e:', e);
      });
  }, []);

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
                    updateStep(3);
                  }}
                >
                  Anterior
                </Button>
                <Button variant="contained" type="submit">
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
