'use client';

import { Box, Button } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
//Internal app
import { api } from '@/utils/api';
import { useRegisterStore, useUiStore } from '@/store';
import { encryptForge } from '@/utils/toolHelper';

export default function Biometric() {
  const { setModalError, setLoadingScreen } = useUiStore();
  const { updateStep, updateControl, ONB_PHASES_TERMS, control } = useRegisterStore();

  const [url, setUrl] = useState<string>('');
  const [btnBack, setBtnBack] = useState<boolean>(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const validateBiometric = useCallback(async () => {
    const payload = {
      payload: {
        contacts: [
          {
            person: {
              names: [
                {
                  firstName: encryptForge(
                    `${ONB_PHASES_TERMS?.consultant?.firstName} ${ONB_PHASES_TERMS?.consultant?.middleName}`
                  ),
                  surName: encryptForge(ONB_PHASES_TERMS?.consultant?.firstLastName),
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
            value: control?.accountId,
          },
          {
            option: 'WORKFLOWID_JM',
            value: control?.workflowId,
          },
        ],
      },
    };
    await api
      .post('/onboarding/validatebiometric', payload)
      .then((response) => {
        const { decision } = response.data.data;
        if (decision === 'ACCEPT') {
          const firstTimer = setTimeout(() => {
            setLoadingScreen(true, { message: 'Verificación correcta' });
            const secondTimer = setTimeout(() => {
              updateStep(6);
            }, 4000);
            return () => {
              setLoadingScreen(false);
              clearTimeout(secondTimer);
            };
          }, 4000);
          return () => {
            setLoadingScreen(false);
            clearTimeout(firstTimer);
          };
        } else {
          updateStep(4);
          setModalError({ title: 'Algo salió mal', description: 'No pudimos validar tus datos.' });
        }
      })
      .catch((e) => {
        updateStep(4);
        setModalError({ title: 'Algo salió mal', description: 'No pudimos validar tus datos.' });
      })
      .finally(() => {
        setLoadingScreen(false);
      });
  }, [
    control,
    ONB_PHASES_TERMS?.consultant?.firstName,
    ONB_PHASES_TERMS?.consultant?.middleName,
    ONB_PHASES_TERMS?.consultant?.firstLastName,
    ONB_PHASES_TERMS?.consultant?.documentType,
    ONB_PHASES_TERMS?.consultant?.documentNumber,
    ONB_PHASES_TERMS?.consultant?.phoneNumber,
    ONB_PHASES_TERMS?.consultant?.email,
    setLoadingScreen,
    updateStep,
    setModalError,
  ]);

  const receiveMessage = useCallback(
    async (event: any) => {
      let data = window.JSON.parse(event.data);
      if (data.payload.value === 'success') {
        setLoadingScreen(true, { message: 'Estamos verificando tu información' });
        await validateBiometric();
      }
      if (data.payload.value === 'error') setBtnBack(true);
    },
    [setLoadingScreen, validateBiometric]
  );

  const captureBiometrics = useCallback(() => {
    updateControl({ accountId: '', workflowId: '' });
    setUrl('');
    const requestFormData = {
      deviceDetect: 'web',
    };
    setLoadingScreen(true);
    api
      .post('/onboarding/capturephotobiometrics ', requestFormData)
      .then((response) => {
        const { web, account, workflowExecution } = response.data.data;
        setUrl(web.href);
        updateControl({ accountId: account.id, workflowId: workflowExecution.id });
        window.addEventListener('message', receiveMessage, false);
      })
      .catch((e) => {
        setModalError({ error: e });
      })
      .finally(() => {
        setLoadingScreen(false);
      });
  }, [receiveMessage, setLoadingScreen, setModalError, updateControl]);

  useEffect(() => {
    captureBiometrics();
  }, []);

  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: { xs: 'flex-start', md: 'center' },
        gap: 2,
        height: '80vh',
        borderRadius: '10px',
      }}
    >
      {url && (
        <iframe
          src={url}
          title="Biometric"
          width="90%"
          height="90%"
          allow="camera;autoplay;fullscreen;clipboard-read;clipboard-write;accelerometer;gyroscope;magnetometer"
          style={{ borderRadius: '10px', borderWidth: '0px' }}
        ></iframe>
      )}
      {btnBack && (
        <Button
          variant="primary"
          onClick={() => {
            captureBiometrics();
            setBtnBack(false);
          }}
        >
          Volver a validar identidad
        </Button>
      )}
    </Box>
  );
}
