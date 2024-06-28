'use client';

import { useEffect, useState } from 'react';
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

  const { updateStep, setShowHeader, onboardingUuId, ONB_PHASES_TERMS, control } = useRegisterStore();

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

  const validateBiometric = async (data: any) => {
    setLoadingScreen(true);
    const requestData = {
      payload: {
        contacts: [
          {
            person: {
              names: [
                {
                  firstName: encryptForge(ONB_PHASES_TERMS?.consultant?.firstName),
                  secondName: encryptForge(ONB_PHASES_TERMS?.consultant?.middleName),
                  surName: encryptForge(ONB_PHASES_TERMS?.consultant?.firstLastName),
                  surName2: encryptForge(ONB_PHASES_TERMS?.consultant?.firstLastName),
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
                phoneIdentifier: encryptForge('MOBILE'),
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
            value: control.accountId,
          },
          {
            option: 'WORKFLOWID_JM',
            value: control.workflowId,
          },
        ],
      },
    };
    console.log('🚀 ~ validateBiometric ~ requestData:', requestData);
    api
      .post('/onboarding/validatebiometric', requestData)
      .then((response) => {
        const { decision } = response.data.data;
        if (decision === 'ACCEPT') {
          // onSubmit(data);
          console.log('🚀 ~ validateBiometric ~ decision:', decision);
          console.log('🚀 ~ onSubmit(data)');
        }
      })
      .catch((e) => {
        console.log('🚀 ~ validateBiometric ~ e:', e);
        setModalError({ title: 'Algo salió mal', description: 'No pudimos validar tus datos.' });
      })
      .finally(() => {
        setLoadingScreen(false);
      });
  };

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
