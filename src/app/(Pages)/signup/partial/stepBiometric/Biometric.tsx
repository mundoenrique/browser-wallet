'use client';

import { Box, Button } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
//Internal app
import { api } from '@/utils/api';
import { useRegisterStore, useUiStore } from '@/store';
import { encryptForge } from '@/utils/toolHelper';

export default function Biometric() {
  const { setModalError, setLoadingScreen } = useUiStore();
  const { updateStep, updateControl, control } = useRegisterStore();
  const phaseInfo = useRegisterStore((state) => state.ONB_PHASES_TERMS);
  const [url, setUrl] = useState<string>('');
  const [btnBack, setBtnBack] = useState<boolean>(false);
  const accountId = useRef<string>('');
  const workflowId = useRef<string>('');

  const hasRun = useRef(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const validateBiometric = useCallback(() => {
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
            value: accountId.current,
          },
          {
            option: 'WORKFLOWID_JM',
            value: workflowId.current,
          },
        ],
      },
    };
    console.log('🚀 ~ validateBiometric ~ payload:', payload);
    api
      .post('/onboarding/validatebiometric', payload)
      .then((response) => {
        const { decision } = response.data.data;
        console.log('🚀 ~validatebiometric .then ~ response.data.data:', response.data.data);
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
        console.log('🚀 ~ validateBiometric ~ e:', e);
        updateStep(4);
        setModalError({ title: 'Algo salió mal', description: 'No pudimos validar tus datos.' });
      })
      .finally(() => {
        setLoadingScreen(false);
      });
  }, [phaseInfo, setLoadingScreen, updateStep, setModalError]);

  const receiveMessage = useCallback(
    async (event: any) => {
      let data = window.JSON.parse(event.data);
      console.log('🚀 ~receiveMessage data.payload.value:', data.payload.value);
      if (data.payload.value === 'success') {
        setLoadingScreen(true, { message: 'Estamos verificando tu información' });
        await validateBiometric();
      }
      if (data.payload.value === 'error') setBtnBack(true);
    },
    [setLoadingScreen, validateBiometric]
  );

  const captureBiometrics = useCallback(() => {
    window.addEventListener('message', receiveMessage, false);
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
        accountId.current = account.id;
        workflowId.current = workflowExecution.id;
        updateControl({ accountId: account.id, workflowId: workflowExecution.id });
      })
      .catch((e) => {
        setModalError({ error: e });
      })
      .finally(() => {
        setLoadingScreen(false);
      });
  }, [receiveMessage, setLoadingScreen, setModalError, updateControl]);

  useEffect(() => {
    if (!hasRun.current) {
      captureBiometrics();
      console.log('Función ejecutada una vez');
      hasRun.current = true;
    }
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
