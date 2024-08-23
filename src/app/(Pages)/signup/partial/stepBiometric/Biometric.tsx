'use client';

import { Box, Button } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
//Internal app
import { api } from '@/utils/api';
import { encryptForge } from '@/utils/toolHelper';
import { useRegisterStore, useUiStore } from '@/store';

export default function Biometric() {
  const { setModalError, setLoadingScreen } = useUiStore();
  const { updateStep, updateControl } = useRegisterStore();
  const phaseInfo = useRegisterStore((state) => state.ONB_PHASES_TERMS);
  const [url, setUrl] = useState<string>('');
  const [btnBack, setBtnBack] = useState<boolean>(false);
  const accountId = useRef<string>('');
  const workflowId = useRef<string>('');

  const hasRun = useRef(false);

  const validateView = useCallback(() => {
    const firstTimer = setTimeout(() => {
      setLoadingScreen(true, { message: 'Verificación correcta' });
      const secondTimer = setTimeout(() => {
        updateStep(6);
        setLoadingScreen(false);
      }, 4000);
      return () => {
        clearTimeout(secondTimer);
      };
    }, 4000);
    return () => {
      clearTimeout(firstTimer);
    };
  }, [setLoadingScreen, updateStep]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const validateBiometric = async () => {
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
    setLoadingScreen(true, { message: 'Estamos verificando tu información' });
    await api
      .post('/onboarding/validatebiometric', payload)
      .then((response) => {
        const { decision } = response.data.data;
        if (decision === 'ACCEPT') {
          validateView();
        } else {
          setLoadingScreen(false);
          updateStep(4);
          setModalError({ title: 'Algo salió mal', description: 'No pudimos validar tus datos.' });
        }
      })
      .catch(() => {
        setLoadingScreen(false);
        updateStep(4);
        setModalError({ title: 'Algo salió mal', description: 'No pudimos validar tus datos.' });
      });
  };

  const receiveMessage = (event: any) => {
    if (typeof event.data !== 'string') return;

    let data = window.JSON.parse(event.data);

    if (data.payload !== undefined) {
      if (data.payload.value === 'success') validateBiometric();

      if (data.payload.value === 'error') setBtnBack(true);
    }
  };

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!hasRun.current) {
      captureBiometrics();
      hasRun.current = true;
    }
  }, [captureBiometrics]);

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
